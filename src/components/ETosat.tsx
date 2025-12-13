import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

interface ETosatProps {
  children?: React.ReactNode;
  classname?: string;
  title?: string;
  type?: "success" | "error";
}
export function ETosat({ children, classname, title, type }: ETosatProps) {
  return (
    <div className="flex flex-col gap-4">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          {type === "success" ? (
            <HiCheck size={20} />
          ) : (
            <HiExclamation size={20} />
          )}
        </div>
        <div className="ml-3 text-sm font-normal">Item moved successfully.</div>
        <ToastToggle />
      </Toast>
    </div>
  );
}
