import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";

import { CloseIcon } from "../icons";

type ModalProps = {
  viewButton: ReactNode;
  modalTitle: string;
  children: ReactNode;
  submitBtn?: ReactNode;
  handleSubmit?: () => void;
  closeBtn?: boolean;
  modalMaxWidth?: string;
};

export default function Modal({
  viewButton,
  modalTitle,
  children,
  submitBtn,
  handleSubmit,
  closeBtn = false,
  modalMaxWidth,
}: ModalProps) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="" onClick={openModal}>
        {viewButton}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-900/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full ${
                    modalMaxWidth ? modalMaxWidth : "max-w-md"
                  } transform relative overflow-hidden rounded-xl bg-white p-4 text-left align-middle shadow transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6"
                  >
                    {modalTitle}
                  </Dialog.Title>

                  {closeBtn && (
                    <div
                      className="absolute top-4 right-4 p-1 rounded-full cursor-pointer flex items-center justify-center"
                      onClick={closeModal}
                    >
                      <CloseIcon classes={"h-4 w-4 text-blue-900"} />
                    </div>
                  )}

                  <div className="mt-4">{children}</div>

                  {!closeBtn && (
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex capitalize outline-none justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                        onClick={closeModal}
                      >
                        cancel
                      </button>
                      {submitBtn && (
                        <div
                          className=""
                          onClick={() => {
                            handleSubmit && handleSubmit();
                            closeModal();
                          }}
                        >
                          {submitBtn}
                        </div>
                      )}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
