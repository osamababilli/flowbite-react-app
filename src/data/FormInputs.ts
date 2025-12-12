import { FinputProps } from "../interfaces";

export const FormInputs: FinputProps[] = [
  {
    id: "name",
    type: "text",
    placeholder: "Please Enter Name",
    require: true,
    name: "name",
    label: "Name",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Please Enter Email",
    require: true,
    name: "email",
    label: "Email",
  },
  {
    id: "age",
    type: "text",
    placeholder: "Please Enter Age",
    require: true,
    name: "age",
    label: "Age",
  },
  {
    id: "password",
    type: "text",
    placeholder: "Please Enter password",
    require: true,
    name: "password",
    label: "Password",
  },
];

export const defaultFormValues = {
  name: "",
  email: "",
  age: "",
  password: "",
};
