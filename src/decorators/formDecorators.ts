
export function FormField(label: string, type: 'text' | 'number' | 'checkbox' | 'button') {
  return function (target: any, propertyKey: string | symbol): void {
    // Check if formFields metadata array exists, if not, initialize it
    if (!target.constructor.formFields) {
      target.constructor.formFields = [];
    }

    // Add the field's metadata to the array
    target.constructor.formFields.push({
      name: propertyKey,
      label,
      type,
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

