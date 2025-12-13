interface IProps {
  children?: React.ReactNode;
  classname?: string;
}

const InputError = ({ children, classname }: IProps) => {
  return <p className={`text-base text-red-500 ${classname}`}>{children}</p>;
};

export default InputError;
