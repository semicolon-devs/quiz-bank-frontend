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

import { lmsAddStudentValidation } from "@/schema/lmsAddStudentValidation";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {

  firstname: "",
  lastname:"",
  email: "",
  password: "",
};

const AddStudentModal = (props: { added: () => void }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const addStudent = (values: FormValues) => {
    // console.log("clicked user add button");
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/register-lms-user`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        firstname: values.firstname,
        lastname:values.lastname,
        email: values.email,
        password: values.password,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
        // console.log("LMS USER ADDED")
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
            alert("Duplicate Student emails found!!");
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
          <p className="">add student</p>
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
                    Add New Student to LMS
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
                      validationSchema={lmsAddStudentValidation}
                      onSubmit={addStudent}
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
                            <label htmlFor="firstname" className={form().label()}>
                              Studnet First Name
                            </label>
                            <Field
                              name="firstname"
                              type="text"
                              className={`${form().input()} ${
                                errors.firstname && touched.firstname
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="firstname"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="lastname" className={form().label()}>
                              Studnet Last Name
                            </label>
                            <Field
                              name="lastname"
                              type="text"
                              className={`${form().input()} ${
                                errors.lastname && touched.lastname
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="lastname"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="email" className={form().label()}>
                              Student Email
                            </label>
                            <Field
                              name="email"
                              type="email"
                              className={`${form().input()} ${
                                errors.email && touched.email
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="email"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="passowrd"
                              className={form().label()}
                            >
                              Assign a Password
                            </label>
                            <Field
                              name="password"
                              type="text"
                              className={`${form().input()} ${
                                errors.password && touched.password
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="password"
                              component="div"
                            />
                          </div>

                          <button type="submit" className={form().button()}>
                            <p className="">Add Student</p>
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

export default AddStudentModal;
