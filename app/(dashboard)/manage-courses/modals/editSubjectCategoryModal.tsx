import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";

import { CloseIcon, EditIcon } from "../../../../components/icons";

import { form } from "@/variants/form";

import { subjectCategoryValidationSchema } from "@/schema/subjectCategoryValidation";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import { SubjectCategory } from "@/types";

interface FormValues {
  subjectCategory: string;
}

const initialValues: FormValues = {
  subjectCategory: "",
};

type Props = {
  subjectCategory: SubjectCategory;
};

const EditSubjectModal = ({ subjectCategory }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const editSubjectCategory = (values: FormValues) => {
    setLoading(true);
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}subjects/courses/${subjectCategory._id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        name: values.subjectCategory,
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

  useEffect(() => {
    initialValues.subjectCategory = subjectCategory.name;
  }, [subjectCategory]);

  return (
    <>
      <div className="" onClick={openModal}>
        <div className="cursor-pointer">
          <EditIcon classes={"h-4 w-4 text-blue-600"} />
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
                    Edit subject Category
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
                      validationSchema={subjectCategoryValidationSchema}
                      onSubmit={editSubjectCategory}
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
                              htmlFor="subjectCategory"
                              className={form().label()}
                            >
                              Subject name
                            </label>
                            <Field
                              name="subjectCategory"
                              type="text"
                              className={`${form().input()} ${
                                errors.subjectCategory &&
                                touched.subjectCategory
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="subjectCategory"
                              component="div"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={form().button()}
                          >
                            <p className="">Confirm changes</p>
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

export default EditSubjectModal;
