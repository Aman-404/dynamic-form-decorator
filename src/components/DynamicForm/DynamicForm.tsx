// import React, { useState } from 'react';

// interface FormFieldMetadata {
//   name: string;
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

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {dtoClass.formFields.map((field: FormFieldMetadata) => (
//         <div key={field.name}>
//           {field.type !== 'button' && (
//             <>
//               <label>{field.label}</label>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 {...(field.type === 'checkbox' && { checked: formData[field.name] })}
//               />
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
interface FormFieldMetadata {
  name: string | symbol;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'button';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (dtoClass.requiredFields) {
      dtoClass.requiredFields.forEach((field: string | symbol) => {
        if (!formData[field]) {
          newErrors[field as string] = 'This field is required';
        }
      });
    }

    // Run custom validators
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
          {field.type !== 'button' && (
            <>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name.toString()}
                value={formData[field.name]}
                onChange={handleChange}
                {...(field.type === 'checkbox' && { checked: formData[field.name] })}
              />
              {errors[field.name as string] && (
                <p style={{ color: 'red' }}>{errors[field.name as string]}</p>
              )}
            </>
          )}
          {field.type === 'button' && (
            <button type="submit">{field.label}</button>
          )}
        </div>
      ))}
    </form>
  );
}

export default DynamicForm;
