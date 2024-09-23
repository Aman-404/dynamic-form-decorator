


// src/dto/SignupFormDTO.ts
import { FormField } from '../decorators/formDecorators';
import {Fields } from './fieldDTO';
import { BaseFormDTO } from './BaseFormDTO'


export class SignupFormDTO extends BaseFormDTO {
    static formFields = [];
    
    @FormField(Fields.Username)
    username!: string;

    @FormField(Fields.Email)
    email!: string;

    @FormField(Fields.Password)
    password!: string;
}
