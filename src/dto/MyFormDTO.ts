
import { FormField, Required } from '../decorators/formDecorators';

export class MyFormDTO {
  @FormField('Name', 'text')
  @Required()
  name!: string;

  @FormField('Age', 'number')
  @Required()
  age!: number;

  @FormField('Comments', 'textarea')
  comments!: string;

  @FormField('Agree to Terms', 'checkbox')
  @Required()
  agree!: boolean;

  @FormField('Gender', 'dropdown', ['Male', 'Female', 'Other'])
  @Required()
  gender!: string;

  @FormField('Appointment', 'date-time')
  // @Required()
  appointment!: string;

  @FormField('Description', 'rtf')
  description!: string;
}

