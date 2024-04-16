"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect, useState } from "react";

import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import axios from "axios";

import { CloseIcon, PlusIcon, GradesIcon } from "../../../../components/icons";

import { table } from "@/variants/table";
import { form } from "@/variants/form";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

interface FormValues {
  paperTitle: string;
  readingSkills: number;
  logicAndProbSol: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didntAns: number;
  wrongAns: number;
  correctAns: number;
  lostMarks: number;
  total: number;
}

interface papers {
  _id: string;
  title: string;
  fileId: string;
}

const GradesModal = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [grades, setGrades] = useState<FormValues>();
  const [papers, setPapers] = useState<papers[]>();
  const [activePaper, setActivePaper] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [initialValues, setInitialValues] = useState<FormValues>({
    paperTitle: "",
    readingSkills: 0,
    logicAndProbSol: 0,
    biology: 0,
    chemistry: 0,
    physicsAndMaths: 0,
    didntAns: 0,
    wrongAns: 0,
    correctAns: 0,
    lostMarks: 0,
    total: 0,
  });

  //get papers
  useEffect(() => {
    const getPapers = async () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/papers`,
        params: {
          page: pageNumber,
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setPapers(response.data);
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalPapers /
                response?.data?.pagination?.limit
            )
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    };

    getPapers();
  }, [activePaper, pageNumber]);

//meka hdenna ona
  //get grades by user and paper
  useEffect(() => {
    const getMarksByPaper = async () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/marks/`,
        params: {
            studentId: props.id,
            paperId: activePaper,
          },
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setGrades(response.data);
        })
        .catch((err) => {
          console.log("Called");
          console.log(err);
        })
        .finally(() => {});
    };

    getMarksByPaper();
  }, [activePaper, props.id]);

  useEffect(() => {
    // Check if grades is defined before updating initial values
    if (grades) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        readingSkills: grades?.readingSkills || prevValues.readingSkills,
        logicAndProbSol: grades?.logicAndProbSol || prevValues.logicAndProbSol,
        biology: grades?.biology || prevValues.biology,
        chemistry: grades?.chemistry || prevValues.chemistry,
        physicsAndMaths: grades?.physicsAndMaths || prevValues.physicsAndMaths,
        didntAns: grades?.didntAns || prevValues.didntAns,
        wrongAns: grades?.wrongAns || prevValues.wrongAns,
        correctAns: grades?.correctAns || prevValues.correctAns,
        lostMarks: grades?.lostMarks || prevValues.lostMarks,
        total: grades?.total || prevValues.total,
      }));
    }
  }, [grades]);

  //change grades
  const changeGrades = (values: FormValues) => {
    
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}lms/grades/`,
      params: {
        studentId: props.id,
        paperId: activePaper,
      },
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        paperTitle: values.paperTitle,
        readingSkills: values.readingSkills,
        logicAndProbSol: values.logicAndProbSol,
        biology: values.biology,
        chemistry: values.chemistry,
        physicsAndMaths: values.physicsAndMaths,
        didntAns: values.didntAns,
        wrongAns: values.wrongAns,
        correctAns: values.correctAns,
        lostMarks: values.lostMarks,
        total: values.total,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
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
          <GradesIcon classes={"w-4 h-4 text-white"} />
          <p className="">Change Grades</p>
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
                  className={`w-[600px] max-h-[80vh] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 text-left shadow-lg`}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6"
                  >
                    Manage Grades of {props.name}
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
                      enableReinitialize
                      onSubmit={changeGrades}
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
                          <div className="bg-red-200 rounded p-2">
                          <div className={form().formDiv()}>
                            <label
                              htmlFor="paperTitle"
                              className={form().label()}
                            >
                              Select Paper
                            </label>
                            <Field
                              name="paperTitle"
                              as="select"
                              value={activePaper}
                              onChange={(e: any) => {
                                console.log("Selected value:", e.target.value);
                                setActivePaper(e.target.value);
                              }}
                              className={`${form().input()} ${
                                errors.paperTitle && touched.paperTitle
                                  ? form().labelError()
                                  : ""
                              }`}
                            >
                              {/* Map through subject options to create dropdown */}
                              {papers &&
                                papers.map((option) => (
                                  <option key={option._id} value={option._id}>
                                    {option.title}
                                  </option>
                                ))}
                            </Field>
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="subject"
                              component="div"
                            />
                          </div>
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="readingSkills"
                              className={form().label()}
                            >
                              Reading Skills
                            </label>
                            <Field
                              name="readingSkills"
                              type="number"
                              className={`${form().input()} ${
                                errors.readingSkills && touched.readingSkills
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="readingSkills"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="logicAndProbSol"
                              className={form().label()}
                            >
                              Logic and Problem Solving
                            </label>
                            <Field
                              name="logicAndProbSol"
                              type="number"
                              className={`${form().input()} ${
                                errors.logicAndProbSol &&
                                touched.logicAndProbSol
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="logicAndProbSol"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="biology" className={form().label()}>
                              Biology
                            </label>
                            <Field
                              name="biology"
                              type="number"
                              className={`${form().input()} ${
                                errors.biology && touched.biology
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="biology"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="chemistry"
                              className={form().label()}
                            >
                              Chemistry
                            </label>
                            <Field
                              name="chemistry"
                              type="number"
                              className={`${form().input()} ${
                                errors.chemistry && touched.chemistry
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="chemistry"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="physicsAndMaths"
                              className={form().label()}
                            >
                              Physics and Maths
                            </label>
                            <Field
                              name="physicsAndMaths"
                              type="number"
                              className={`${form().input()} ${
                                errors.physicsAndMaths &&
                                touched.physicsAndMaths
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="physicsAndMaths"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="didntAns"
                              className={form().label()}
                            >
                              Did not Answer
                            </label>
                            <Field
                              name="didntAns"
                              type="number"
                              className={`${form().input()} ${
                                errors.didntAns && touched.didntAns
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="didntAns"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="wrongAns"
                              className={form().label()}
                            >
                              Wrong Answer
                            </label>
                            <Field
                              name="wrongAns"
                              type="number"
                              className={`${form().input()} ${
                                errors.wrongAns && touched.wrongAns
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="wrongAns"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="correctAns"
                              className={form().label()}
                            >
                              Correct Answer
                            </label>
                            <Field
                              name="correctAns"
                              type="number"
                              className={`${form().input()} ${
                                errors.correctAns && touched.correctAns
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="correctAns"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="lostMarks"
                              className={form().label()}
                            >
                              Lost Marks
                            </label>
                            <Field
                              name="lostMarks"
                              type="number"
                              className={`${form().input()} ${
                                errors.lostMarks && touched.lostMarks
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="lostMarks"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label htmlFor="total" className={form().label()}>
                              Total
                            </label>
                            <Field
                              name="total"
                              type="number"
                              className={`${form().input()} ${
                                errors.total && touched.total
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="total"
                              component="div"
                            />
                          </div>

                          <button type="submit" className={form().button()}>
                            <p className="">Add/Update Marks</p>
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

export default GradesModal;
