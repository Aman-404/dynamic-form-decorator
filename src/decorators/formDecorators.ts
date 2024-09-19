type FieldType = 'text' | 'number' | 'checkbox' | 'button' | 'textarea' | 'dropdown' | 'select' | 'rtf' | 'grid' | 'date-time';

export function FormField(label: string, type: FieldType, options?: string[]) {
  return function (target: any, propertyKey: string | symbol): void {
    if (!target.constructor.formFields) {
      target.constructor.formFields = [];
    }

    target.constructor.formFields.push({
      name: propertyKey,
      label,
      type,
      options, // Options for dropdowns or select boxes
    });
  };
}



export function Required() {
  return function (target: any, propertyKey: string | symbol) {
    if (!target.constructor.requiredFields) {
      target.constructor.requiredFields = [];
    }

    target.constructor.requiredFields.push(propertyKey);
  };
}


// export function Validate(validatorFn: (value: any) => string | null) {
//   return function (target: any, propertyKey: string | symbol) {
//     if (!target.constructor.validators) {
//       target.constructor.validators = {};
//     }

//     // Store the validator function for this specific field
//     target.constructor.validators[propertyKey] = validatorFn;
//   };
// }

