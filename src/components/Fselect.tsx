import { Label, Select } from "flowbite-react";
import InputError from "./InputError";

interface FselectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  name: string;
  label: string;
  options: string[];
  error?: string;
}
export function Fselect({
  id,
  name,
  label,
  options,
  error,
  ...props
}: FselectProps) {
  return (
    <>
      <div className="w-max-lg w-full">
        <div className="mb-2 block">
          <Label htmlFor={id}>{label}</Label>
        </div>

        <Select {...props} name={name} id={id} required>
          <option value="">select Role</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
      <InputError> {error} </InputError>
    </>
  );
}
