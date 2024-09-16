import { FormField } from '../decorators/formDecorators';

export class MyFormDTO {
  @FormField('First Name', 'text')
  firstName: string = '';

  
  @FormField('last Name', 'text')
  lastName: string = '';

  @FormField('Age', 'number')
  age: number = 0;

  @FormField('Subscribe to newsletter', 'checkbox')
  subscribe: boolean = false;

  @FormField('Submit', 'button')
  submit: boolean = false;
}
