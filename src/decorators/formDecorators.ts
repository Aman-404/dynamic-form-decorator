
import { FieldDTO } from '../dto/fieldDTO';

export function FormField(field: FieldDTO) {
  return function (target: any, propertyKey: string | symbol): void {
    if (!target.constructor.formFields) {
      target.constructor.formFields = [];
    }
    target.constructor.formFields.push(field);
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


