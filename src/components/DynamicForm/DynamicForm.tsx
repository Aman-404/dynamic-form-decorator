// src/components/DynamicForm.tsx
import React, { useState } from 'react';
import { FieldDTO } from '../../dto/fieldDTO';
import '../../styles/formStyles.module.css';
// import { BaseFormDTO } from '../../dto/BaseFormDTO';
interface DynamicFormProps {
  formFields: FieldDTO[];
  moduleName: string;
}


const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, moduleName }) => {

  const [formData, setFormData] = useState(() => {
    const initialValues: { [key: string]: any } = {};
    formFields.forEach((field) => {
      initialValues[field.name.toString()] = '';
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

    formFields.forEach((field) => {
      // Check required fields
      if (field.required && !formData[field.name.toString()]) {
        newErrors[field.name.toString()] = 'This field is required';
      }

      // Run custom validators
      if (field.validators) {
        field.validators.forEach((validator) => {
          const error = validator(formData[field.name.toString()]);
          if (error) {
            newErrors[field.name.toString()] = error;
          }
        });
      }
    });

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

  const renderField = (field: FieldDTO) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'password':
      case 'email':
        return (
          <input
            type={field.type}
            name={field.name.toString()}
            value={formData[field.name.toString()]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
        );
      case 'textarea':
        return (
          <textarea
            name={field.name.toString()}
            value={formData[field.name.toString()]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name.toString()}
            checked={formData[field.name.toString()] || false}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <select
            name={field.name.toString()}
            value={formData[field.name.toString()]}
            onChange={handleChange}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            name={field.name.toString()}
            value={formData[field.name.toString()]}
            onChange={handleChange}
          />
        );
      case 'time':
        return (
          <input
            type="time"
            name={field.name.toString()}
            value={formData[field.name.toString()]}
            onChange={handleChange}
          />
        );
      case 'grid':
        // Implement grid logic here based on field.gridConfig
        return <div>Grid component placeholder</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <h2 style={{textAlign:"center"}}>{moduleName}</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name.toString()}>
            <label>{field.label}</label>
            {renderField(field)}
            {errors[field.name.toString()] && (
              <p className="error-message">{errors[field.name.toString()]}</p>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default DynamicForm;

