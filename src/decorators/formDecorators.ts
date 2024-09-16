
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
