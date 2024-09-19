
// import React, { useState } from 'react';
// import '../../styles/formStyles.module.css';
// interface FormFieldMetadata {
//   name: string | symbol;
//   label: string;
//   type: 'text' | 'number' | 'checkbox' | 'button';
// }

// function DynamicForm({ dtoClass }: { dtoClass: any }) {
//   const [formData, setFormData] = useState(() => {
//     const initialValues: any = {};
//     dtoClass.formFields.forEach((field: FormFieldMetadata) => {
//       initialValues[field.name] = '';
//     });
//     return initialValues;
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors: { [key: string]: string } = {};

//     // Validate required fields
//     if (dtoClass.requiredFields) {
//       dtoClass.requiredFields.forEach((field: string | symbol) => {
//         if (!formData[field]) {
//           newErrors[field as string] = 'This field is required';
//         }
//       });
//     }

//     // Run custom validators
//     if (dtoClass.validators) {
//       for (const field in dtoClass.validators) {
//         const error = dtoClass.validators[field](formData[field]);
//         if (error) {
//           newErrors[field] = error;
//         }
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form Data:', formData);
//     } else {
//       console.log('Validation failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {dtoClass.formFields.map((field: FormFieldMetadata) => (
//         <div key={field.name.toString()}>
//           {field.type !== 'button' && (
//             <>
//               <label>{field.label}</label>
//               <input
//                 type={field.type}
//                 name={field.name.toString()}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 {...(field.type === 'checkbox' && { checked: formData[field.name] })}
//               />
//               {errors[field.name as string] && (
//                 <p style={{ color: 'red' }}>{errors[field.name as string]}</p>
//               )}
//             </>
//           )}
//           {field.type === 'button' && (
//             <button type="submit">{field.label}</button>
//           )}
//         </div>
//       ))}
//     </form>
//   );
// }

// export default DynamicForm;



import React, { useState } from 'react';
import '../../styles/formStyles.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

interface FormFieldMetadata {
  name: string | symbol;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'button' | 'textarea' | 'dropdown' | 'select' | 'rtf' | 'grid' | 'date-time';
  options?: string[]; // For dropdown and select
}

function DynamicForm({ dtoClass }: { dtoClass: any }) {
  const [formData, setFormData] = useState(() => {
    const initialValues: any = {};
    dtoClass.formFields.forEach((field: FormFieldMetadata) => {
      initialValues[field.name] = '';
    });
    return initialValues;
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Check if the field is a checkbox
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked, // Use `checked` instead of `value` for checkboxes
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value, // Use `value` for other types
      }));
    }
  };


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (dtoClass.requiredFields) {
      dtoClass.requiredFields.forEach((field: string | symbol) => {
        if (!formData[field]) {
          newErrors[field as string] = 'This field is required';
        }
      });
    }

    if (dtoClass.validators) {
      for (const field in dtoClass.validators) {
        const error = dtoClass.validators[field](formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData);
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {dtoClass.formFields.map((field: FormFieldMetadata) => (
        <div key={field.name.toString()}>
          <label>{field.label}</label>
          {field.type === 'text'  && (
            <input
              type="text"
              name={field.name.toString()}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              name={field.name.toString()}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
          {field.type === 'number' && (
            <input
              type="number"
              name={field.name.toString()}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
          {field.type === 'checkbox' && (
            <input
              type="checkbox"
              name={field.name.toString()}
              checked={formData[field.name]}
              onChange={handleChange}
            />
          )}
          {field.type === 'dropdown' && (
            <select name={field.name.toString()} value={formData[field.name]} onChange={handleChange}>
              {field.options?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === 'select' && (
            <select name={field.name.toString()} value={formData[field.name]} onChange={handleChange} multiple>
              {field.options?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === 'date-time' && (
            <>
              <input
                type="date"
                name={`${field.name.toString()}_date`}
                value={formData[`${field.name.toString()}_date`]}
                onChange={handleChange}
              />
              <input
                type="time"
                name={`${field.name.toString()}_time`}
                value={formData[`${field.name.toString()}_time`]}
                onChange={handleChange}
              />
            </>
          )}
          {/* Placeholder for RTF and grid implementations */}
          {field.type === 'rtf' && (
            <div>
              <ReactQuill
                value={formData[field.name]}
                onChange={(value) => setFormData((prev: any) => ({ ...prev, [field.name]: value }))}
              />
            </div>
          )}
          {errors[field.name as string] && <p style={{ color: 'red' }}>{errors[field.name as string]}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;
