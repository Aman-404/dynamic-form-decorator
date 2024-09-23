// src/dto/LoginFormDTO.ts
import { FormField } from '../decorators/formDecorators';
import {  Fields } from './fieldDTO';
import { BaseFormDTO } from './BaseFormDTO'


export class LoginFormDTO extends BaseFormDTO  {
    static formFields = [];
    
    @FormField(Fields.Username)
    username!: string;

    @FormField(Fields.Password)
    password!: string;
}
