"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import axios from "axios";

import { CloseIcon, PlusIcon } from "../../../../components/icons";

import { table } from "@/variants/table";
import { form } from "@/variants/form";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

import { lmsAddPDFPaperValidation } from "@/schema/lmsAddPDFPaperValidation";

interface FormValues {
  title: string;
  subject: string;
  fileId: string;
}


const subjectOptions = [
  { value: "not_specified", label: "Not Specified" },
  { value: "reading_skills", label: "Reading Skills" },
  { value: "general_knowledge", label:"General Knowledge"},
  { value: "logical_reasoning", label: "Logical Reasoning" },
  { value: "problem_solving", label: "Problem Solving" },
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "maths", label: "Maths" },
];

const initialValues: FormValues = {
  title: "",
  subject: subjectOptions[0].label,
  fileId: "",
};


const AddNoteModal = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const getFileIdFromGoogleDriveUrl = (url: string) => {
    const regex: RegExp =
      /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:.*\/)?d\/)([\w-]{25,})/;

    // Attempt to match the URL with the regular expression
    const match: RegExpMatchArray | null = url.match(regex);

    if (match) {
      // Return the file ID captured in the first capture group
      return match[1];
    } else {
      // Handle invalid or unrecognized URLs
      return null;
    }
  };

  

  const AddPDFPaper = (values: FormValues) => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}lms/notes`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        title: values.title,
        subject: values.subject,
        fileId: getFileIdFromGoogleDriveUrl(values.fileId),
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(axiosConfig.data);
        if (response.status === 201) {
          props.added();
          closeModal();
        } else {
          alert("Unexpected status code: " + response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          if (error.response.status === 500) {
            alert("Duplicates found!!");
          } else if (error.response.status === 401) {
            alert("Duplicates found!!");
          } else {
            alert("Error: " + error.response.status);
          }
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
          alert("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", error.message);
          alert("An error occurred: " + error.message);
        }
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
      <div className="" onClick={openModal}>
        <button className={table().featuresButton()}>
          <PlusIcon classes={"w-4 h-4 text-white"} />
          <p className="">add Notes</p>
        </button>
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
                    Add New Notes to LMS
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
                      validationSchema={lmsAddPDFPaperValidation}
                      onSubmit={AddPDFPaper}
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
                              Note Name
                            </label>
                            <Field
                              name="title"
                              type="text"
                              className={`${form().input()} ${
                                errors.title && touched.title
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="title"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="email" className={form().label()}>
                              Drive Link
                            </label>
                            <Field
                              name="fileId"
                              type="text"
                              className={`${form().input()} ${
                                errors.fileId && touched.fileId
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="fileId"
                              component="div"
                            />
                          </div>
                          <div className={form().formDiv()}>
                            <label htmlFor="subject" className={form().label()}>
                              Subject
                            </label>
                            <Field
                              name="subject"
                              as="select"
                              className={`${form().input()} ${
                                errors.subject && touched.subject
                                  ? form().labelError()
                                  : ""
                              }`}
                            >
                              {/* Map through subject options to create dropdown */}
                              {subjectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="subject"
                              component="div"
                            />
                          </div>

                          <button type="submit" className={form().button()}>
                            <p className="">Add Paper</p>
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

export default AddNoteModal;
