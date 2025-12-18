"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

interface FmodalProps {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  saveFn: () => void;
  title: string;
}

export function Fmodal({
  children,
  open,
  onClose,
  title,
  saveFn,
}: FmodalProps) {
  return (
    <Modal show={open} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>

      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        <Button
          className="w-full"
          onClick={() => {
            saveFn();
          }}
        >
          Save
        </Button>

        <Button className="w-full" color="alternative" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
