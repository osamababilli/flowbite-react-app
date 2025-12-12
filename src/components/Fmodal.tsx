"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";

interface FmodalProps {
  children?: React.ReactNode;
  setOpenModalFn: () => boolean;
  saveFn: () => boolean;
  title: string;
}

export function Fmodal({
  children,
  setOpenModalFn,
  title,
  saveFn,
}: FmodalProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Open New Entry Form</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button className="w-full" onClick={() => setOpenModal(saveFn)}>
            Save
          </Button>
          <Button
            className="w-full"
            color="alternative"
            onClick={() => {
              setOpenModal(setOpenModalFn);
            }}
          >
            cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
