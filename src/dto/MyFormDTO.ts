
import { FormField, Required } from '../decorators/formDecorators';

export class MyFormDTO {
  @FormField('First Name', 'text')
  @Required()
  firstName: string = '';

  @FormField('Last Name','text')
  @Required()
  lastName: string = '';

  @FormField('Age', 'number')
  @Required()
  age: number = 0;

  @FormField('I accept terms and conditions', 'checkbox')
  @Required()
  subscribe: boolean = false;

  @FormField('Submit', 'button')
  submit: boolean = false;
}
