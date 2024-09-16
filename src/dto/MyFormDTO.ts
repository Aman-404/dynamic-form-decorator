// import { FormField } from '../decorators/formDecorators';

// export class MyFormDTO {
//   @FormField('First Name', 'text')
//   firstName: string = '';

  
//   @FormField('last Name', 'text')
//   lastName: string = '';

//   @FormField('Age', 'number')
//   age: number = 0;

//   @FormField('Subscribe to newsletter', 'checkbox')
//   subscribe: boolean = false;

//   @FormField('Submit', 'button')
//   submit: boolean = false;
// }
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
  subscribe: boolean = false;

  @FormField('Submit', 'button')
  submit: boolean = false;
}
