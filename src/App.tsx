import { DarkThemeToggle } from "flowbite-react";
import { Finput } from "./components/Finput";
import { defaultFormValues, FormInputs } from "./data/FormInputs";
import { useState } from "react";
import { Fmodal } from "./components/Fmodal";
import type { IFormValues } from "./interfaces";
import { Fcard } from "./components/Fcard";
import { v4 as uuid } from "uuid";
import { FormValidation } from "./utils/FormValidition";
import InputError from "./components/InputError";
import { Fselect } from "./components/Fselect";

export default function App() {
  /* Global State */
  const [FormValus, setFormValus] = useState(defaultFormValues);
  const [Contacts, SetContacts] = useState<IFormValues[]>([]);
  const [errorsArray, setErrorsArray] =
    useState<IFormValues>(defaultFormValues);
  /* Renders Inputs  */
  const InputsRender = FormInputs.map((input) => (
    <div key={input.id}>
      <Finput
        className={
          errorsArray[input.id as keyof typeof errorsArray]
            ? "rounded-lg border-1 border-red-500"
            : ""
        }
        {...input}
        value={FormValus[input.id as keyof typeof FormValus] as string}
        onChange={(e) => {
          setFormValus({
            ...FormValus,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <InputError>
        {errorsArray[input.id as keyof typeof errorsArray] as string}
      </InputError>
    </div>
  ));

  /* Renders Contacts  */
  const ContactsRender =
    Contacts.length === 0 ? (
      <h1 className="col-span-5 text-center font-normal text-gray-700 dark:text-gray-400">
        No Contacts Available
      </h1>
    ) : (
      Contacts.map((contact) => (
        <Fcard classname="w-full max-w-3xl" key={contact.id}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {contact.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Email: {contact.email}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Age: {contact.age}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Password: {contact.password}
          </p>
        </Fcard>
      ))
    );

  function handleFormSubmit() {
    const errors = FormValidation(FormValus);
    setErrorsArray(errors);
    console.log(errors);

    const isError = Object.values(errors).some((error) => error !== "");
    if (isError) return true;

    SetContacts([{ ...FormValus, id: uuid() }, ...Contacts]);
    setFormValus(defaultFormValues);

    return false;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <img
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
          />
          <img
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      {/* content start here */}
      <div className="relative flex w-full max-w-7xl flex-col items-center justify-center gap-12">
        <Fmodal
          saveFn={() => handleFormSubmit()}
          title="New Entry"
          setOpenModalFn={() => {
            setFormValus(defaultFormValues);
            setErrorsArray(defaultFormValues);
            return false;
          }}
        >
          {InputsRender}
          <Fselect
            onChange={(e) => {
              setFormValus({
                ...FormValus,
                role: e.target.value,
              });
            }}
            error={errorsArray.role as string}
            id="role"
            name="role"
            label="Role"
            options={["admin", "user", "guest"]}
          />
        </Fmodal>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {ContactsRender}
        </div>
      </div>
    </main>
  );
}
