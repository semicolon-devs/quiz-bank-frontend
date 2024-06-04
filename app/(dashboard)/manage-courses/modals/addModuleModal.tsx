import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import axios from "axios";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";

import { CloseIcon, PlusIcon } from "../../../../components/icons";

import { form } from "@/variants/form";

import { moduleValidationSchema } from "@/schema/moduleValidation";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { SubjectCategory } from "@/types";

interface FormValues {
  module: string;
}

const initialValues: FormValues = {
  module: "",
};

type Props = {
  subjectCategory: SubjectCategory;
};

const AddSubCategoryModal = ({ subjectCategory }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const addNewModule = async (values: FormValues) => {
    setLoading(true);

    const accessToken = await getAccess();

    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}subjects/module/${subjectCategory._id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name: values.module,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
        closeModal();
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="" onClick={openModal}>
        <div className="w-full rounded-lg cursor-pointer bg-blue-100 py-2 px-4 text-base text-start font-medium leading-5 flex justify-center gap-2 items-center outline-none text-blue-400">
          <PlusIcon classes={"h-3 w-3"} />
          <p className="">Add module</p>
        </div>
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
                  className={`w-full max-w-md transform relative overflow-hidden rounded-xl bg-white p-4 text-left align-middle shadow transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6"
                  >
                    Add module to {subjectCategory.name}
                  </Dialog.Title>

                  <div
                    className="absolute top-4 right-4 p-1 rounded-full cursor-pointer flex items-center justify-center"
                    onClick={closeModal}
                  >
                    <CloseIcon classes={"h-4 w-4 text-blue-900"} />
                  </div>

                  <div className="mt-4">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={moduleValidationSchema}
                      onSubmit={addNewModule}
                    >
                      {({
                        isSubmitting,
                        errors,
                        handleSubmit,
                        touched,
                        values,
                      }) => (
                        <form
                          onSubmit={handleSubmit}
                          className={form().innerForm()}
                        >
                          <div className={form().formDiv()}>
                            <label
                              htmlFor="module"
                              className={form().label()}
                            >
                              Module name
                            </label>
                            <Field
                              name="module"
                              type="text"
                              className={`${form().input()} ${
                                errors.module &&
                                touched.module
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="module"
                              component="div"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={form().button()}
                          >
                            <p className="">Add module</p>
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddSubCategoryModal;
