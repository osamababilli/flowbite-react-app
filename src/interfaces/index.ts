import { defaultFormValues } from "./../data/FormInputs";

export interface FinputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  placeholder: string;
  require?: boolean;
  label: string;
  name: keyof typeof defaultFormValues;
}

export interface IFormValues {
  id?: string;
  name: string;
  email: string;
  age: string;
  password: string;
  role: string[] | string;
}
