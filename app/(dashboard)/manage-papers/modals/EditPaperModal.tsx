"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState, useEffect } from "react";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import axios from "axios";

import { CloseIcon, EditIcon } from "../../../../components/icons";

import { table } from "@/variants/table";
import { form } from "@/variants/form";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

import { addPaperValidationSchema } from "@/schema/addPaperValidation";

import { PaperDetails } from "@/types";

interface FormValues {
  name: string;
  code: string;
  paperType: PaperType;
  time: Number;
  isTimed: boolean;
}

const initialValues: FormValues = {
  name: "",
  code: "",
  paperType: PaperType.ONE_ATTEMPT,
  time: 0,
  isTimed: false,
};

type EditPaperModalProps = {
  paper: PaperDetails;
};

const EditPaperModal = ({ paper }: EditPaperModalProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initialValues.name = paper && paper.name;
    initialValues.code = paper && paper.paperId;
    initialValues.paperType =
      paper && paper.paperType === PaperType.MULTIPLE_ATTEMPT
        ? PaperType.MULTIPLE_ATTEMPT
        : PaperType.ONE_ATTEMPT;
    initialValues.isTimed = paper && paper.isTimed;
    initialValues.time = paper && paper.timeInMinutes;
  }, [paper]);

  const editPaper = (values: FormValues) => {
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}papers`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        paperId: values.code,
        name: values.name,
        timeInMinutes: values.time,
        isTimed: values.isTimed,
        paperType: values.paperType,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        <EditIcon classes="h-4 w-4 text-blue-600" />
      </div>

      <Transition appear show={isOpenModal} as={Fragment}>
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
                    Add Paper
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
                      validationSchema={addPaperValidationSchema}
                      onSubmit={editPaper}
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
                            <label htmlFor="name" className={form().label()}>
                              Paper name
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className={`${form().input()} ${
                                errors.name && touched.name
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="name"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="code" className={form().label()}>
                              Paper Code
                            </label>
                            <Field
                              name="code"
                              type="text"
                              className={`${form().input()} ${
                                errors.code && touched.code
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="code"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="paperType"
                              className={form().label()}
                            >
                              Paper Type
                            </label>
                            <Field
                              name="paperType"
                              as="select"
                              className={`${form().input()} ${
                                errors.name && touched.name
                                  ? form().labelError()
                                  : ""
                              }`}
                            >
                              <option value={PaperType.ONE_ATTEMPT}>
                                One attempt
                              </option>
                              <option value={PaperType.MULTIPLE_ATTEMPT}>
                                Multiple attempt
                              </option>
                            </Field>
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="PaperType"
                              component="div"
                            />
                          </div>

                          <div className={form().checkBoxDiv()}>
                            <Field
                              name="isTimed"
                              type="checkbox"
                              className={`${form().checkBox()} ${
                                errors.isTimed && touched.isTimed
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <label htmlFor="isTimed" className={form().label()}>
                              Is the paper timed?
                            </label>
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="isTimed"
                              component="div"
                            />
                          </div>

                          {values.isTimed && (
                            <div className={form().formDiv()}>
                              <label htmlFor="time" className={form().label()}>
                                Paper Duration (minutes)
                              </label>
                              <Field
                                name="time"
                                type="number"
                                className={`${form().input()} ${
                                  errors.time && touched.time
                                    ? form().labelError()
                                    : ""
                                }`}
                              />
                              <ErrorMessage
                                className={form().errorMessage()}
                                name="time"
                                component="div"
                              />
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={form().button()}
                          >
                            <p className="">add paper</p>
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

export default EditPaperModal;
