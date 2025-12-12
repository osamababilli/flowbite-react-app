import { Card } from "flowbite-react";

interface FcardProps {
  // Define any props if needed
  children?: React.ReactNode;
  classname?: string;
}
export function Fcard({ children, classname }: FcardProps) {
  return <Card className={`max-w-sm ${classname}`}>{children}</Card>;
}
