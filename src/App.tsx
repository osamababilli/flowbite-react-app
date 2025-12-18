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
import { Button } from "flowbite-react";

export default function App() {
  /* Global State */
  const [FormValus, setFormValus] = useState(defaultFormValues);
  const [Contacts, SetContacts] = useState<IFormValues[]>([]);

  const [EditContactValues, setEditContactValues] =
    useState<IFormValues>(defaultFormValues);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [errorsArray, setErrorsArray] =
    useState<IFormValues>(defaultFormValues);
  /* Renders Inputs  */
  const EditInputsRender = FormInputs.map((input) => (
    <div key={input.id}>
      <Finput
        className={
          errorsArray[input.id as keyof typeof errorsArray]
            ? "rounded-lg border-1 border-red-500"
            : ""
        }
        {...input}
        value={
          EditContactValues[
            input.id as keyof typeof EditContactValues
          ] as string
        }
        onChange={(e) => {
          setEditContactValues({
            ...EditContactValues,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <InputError>
        {errorsArray[input.id as keyof typeof errorsArray] as string}
      </InputError>
    </div>
  ));

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
      Contacts.map((contact, idx) => (
        <Fcard
          classname="w-full max-w-3xl flex flex-col gap-1"
          key={contact.id}
        >
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={() => {
                handleEditContact(idx);
              }}
              className="rounded-lg bg-blue-600 px-3 py-1 text-white transition-all hover:bg-blue-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteContact(idx)}
              className="rounded-lg bg-red-600 px-3 py-1 text-white transition-all hover:bg-red-500"
            >
              Delete
            </button>
          </div>
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
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Role: {contact.role}
          </p>
        </Fcard>
      ))
    );

  // Form  Handlers //
  function handleFormSubmit() {
    const errors = FormValidation(FormValus);
    setErrorsArray(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      // خليك بالمودال وما تحفظ شي
      return;
    }

    // ✅ فقط إذا ما في أخطاء
    SetContacts([{ ...FormValus, id: uuid() }, ...Contacts]);

    setFormValus(defaultFormValues);
    setOpenModal(false);
  }

  function handleEditContact(idx: number) {
    setEditContactValues(Contacts[idx]);

    setOpenModalEdit(true);
  }

  function handleEditSubmit() {
    const errors = FormValidation(EditContactValues);
    setErrorsArray(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      // خليك بالمودال وما تحفظ شي
      return;
    }

    // ✅ فقط إذا ما في أخطاء

    const updatedContacts = [...Contacts];
    updatedContacts.splice(
      Contacts.findIndex((contact) => contact.id === EditContactValues.id),
      1,
      EditContactValues,
    );
    SetContacts(updatedContacts);
    setOpenModalEdit(false);
  }

  function handleDeleteContact(idx: number) {
    SetContacts(Contacts.filter((_, i) => i !== idx)); // set the form values to the contact;
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
        <Button onClick={() => setOpenModal(true)}>Open New Entry Form</Button>

        <Fmodal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setFormValus(defaultFormValues);
            setErrorsArray(defaultFormValues);
          }}
          saveFn={handleFormSubmit}
          title="New Entry"
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

        <Fmodal
          open={openModalEdit}
          onClose={() => {
            setOpenModalEdit(false);
            setFormValus(defaultFormValues);
            setErrorsArray(defaultFormValues);
          }}
          saveFn={handleEditSubmit}
          title="edit Entry"
        >
          {EditInputsRender}
          <Fselect
            value={EditContactValues.role}
            onChange={(e) => {
              setEditContactValues({
                ...EditContactValues,
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

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {ContactsRender}
        </div>
      </div>
    </main>
  );
}
