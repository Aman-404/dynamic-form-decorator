

export abstract class BaseFormDTO {
    static moduleName: string; // This will be overridden in subclasses
    static formFields: any[] = []; // Placeholder for form fields
}