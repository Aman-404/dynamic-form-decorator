// src/dto/FieldDTO.ts
export class FieldDTO {
    constructor(
        public name: string | symbol,
        public label: string,
        public type: 'text' | 'number' | 'checkbox' | 'button' | 'textarea' | 'select' | 'date' | 'time' | 'grid'  | 'email' | 'password',

        public options?: string[], // For select box options
        public required: boolean = false, // Default is not required
        public validators?: ((value: any) => string | null)[], // Optional validators
        public placeholder?: string, // Placeholder for text/textarea fields
        public gridConfig?: { columns: string[], rows: any[][] }, // For grid structure
        public customAttributes?: { [key: string]: any } // Additional custom attributes
    ) { }
}

// Define reusable fields
export const Fields = {
    Username: new FieldDTO('username', 'Username', 'text', undefined, true, undefined, 'Enter your username'),
    Password: new FieldDTO('password', 'Password', 'password', undefined, true, undefined, 'Enter your password'),
    Email: new FieldDTO('email', 'Email', 'email', undefined, true, undefined, 'Enter your email'),
    Age: new FieldDTO('age', 'Age', 'number', undefined, false, [
        (value) => (value < 18 ? 'Must be 18 or older' : null)
    ], 'Enter your age'),
    Gender: new FieldDTO('gender', 'Gender', 'select', ['Male', 'Female', 'Other'])
};
