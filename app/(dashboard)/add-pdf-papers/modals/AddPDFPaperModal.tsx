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
  name: string;
  driveLink: string;
}

const initialValues: FormValues = {
  name: "",
  driveLink: "",
};

const AddPDFPaperModal = () => {
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
    console.log(getFileIdFromGoogleDriveUrl(values.driveLink));
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}lms/auth/register`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        name: values.name,
        driveLink: getFileIdFromGoogleDriveUrl(values.driveLink),
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          closeModal();
        } else {
          alert("Unexpected status code: " + response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if (error.response.status === 500) {
            alert("Duplicate Student emails found!!");
          } else {
            alert("Error: " + error.response.status);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert("No response received from the server");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
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
          <p className="">add PDF paper</p>
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
                    Add New Weekly Papers to LMS
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
                              Paper Name
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
                            <label htmlFor="email" className={form().label()}>
                              Drive Link
                            </label>
                            <Field
                              name="driveLink"
                              type="text"
                              className={`${form().input()} ${
                                errors.driveLink && touched.driveLink
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="driveLink"
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

export default AddPDFPaperModal;
