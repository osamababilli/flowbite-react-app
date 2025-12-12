import { Label, TextInput } from "flowbite-react";

interface FinputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: string;
  placeholder: string;
  require?: boolean;
  label: string;
  name?: string;
}
export function Finput({
  id,
  type,
  placeholder,
  require,
  label,
  name,

  ...props
}: FinputProps) {
  return (
    <div className="mb-1 w-full max-w-xl">
      <div className="mb-1">
        <Label htmlFor={id}>{label}</Label>
      </div>
      <TextInput
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        {...{ required: require }}
        {...props}
      />
    </div>
  );
}
