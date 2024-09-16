import React, { useState } from 'react';

interface FormFieldMetadata {
  name: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {dtoClass.formFields.map((field: FormFieldMetadata) => (
        <div key={field.name}>
          {field.type !== 'button' && (
            <>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                {...(field.type === 'checkbox' && { checked: formData[field.name] })}
              />
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
