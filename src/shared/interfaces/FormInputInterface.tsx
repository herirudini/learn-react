import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface InputProps {
  id: string;
  name: string; // Field name
  defaultValue?: any;
  placeholder?: string; // Placeholder text
  errors?: FieldErrors; // Error message
  register:  UseFormRegister<any>; // React Hook Form's `register` method
}