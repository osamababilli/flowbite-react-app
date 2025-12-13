import { IFormValues } from "../interfaces";

export function FormValidation(FormValues: IFormValues) {
  const errors: IFormValues = {
    name: "",
    email: "",
    age: "",
    password: "",
    role: "",
  };

  if (!FormValues.name || !FormValues.name.trim()) {
    errors.name = "Name is required";
  }
  if (!FormValues.email) {
    errors.email = "Email is required";
  }
  if (
    !FormValues.age ||
    !FormValues.age.trim() ||
    isNaN(Number(FormValues.age))
  ) {
    errors.age = "Age is required";
  }
  if (!FormValues.password) {
    errors.password = "Password is required";
  }

  if (!FormValues.role) {
    errors.role = "Role is required";
  }

  return errors;
}
