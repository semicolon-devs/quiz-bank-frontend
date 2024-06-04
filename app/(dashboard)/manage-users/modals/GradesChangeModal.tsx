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
  reading: number;
  logicalAndProblemSolving: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didNotAnswer: number;
  wrongAnswer: number;
  corrcetAnswer: number;
  lostmarks: number;
  total: number;
}

interface papers {
  _id: string;
  title: string;
  fileId: string;
}

interface UserMark {
  _id: string;
  paperId: {
    _id: string;
    title: string;
  };
  userId: string;
  reading: number;
  logicalAndProblemSolving: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didNotAnswer: number;
  wrongAnswer: number;
  corrcetAnswer: number;
  lostmarks: number;
  total: number;
  __v: number;
}

const GradesModal = (props: any) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [grades, setGrades] = useState<FormValues[]>();
  const [papers, setPapers] = useState<papers[]>();
  const [activePaper, setActivePaper] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [userMarks, setUserMarks] = useState<UserMark[]>();
  const [dataloaded, SetDataLoaded] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<FormValues>({
    paperTitle: activePaper,
    reading: 0,
    logicalAndProblemSolving: 0,
    biology: 0,
    chemistry: 0,
    physicsAndMaths: 0,
    didNotAnswer: 0,
    wrongAnswer: 0,
    corrcetAnswer: 0,
    lostmarks: 0,
    total: 0,
  });

  const loadingCompleted = () => {
    SetDataLoaded(true);
  };

  const filterPapersByUserMarks = () => {
    if (!papers || !userMarks) return [];
    // Extract paper IDs from user marks
    const markedPaperIds = userMarks.map((mark) => mark.paperId._id);
    // Filter papers based on whether their ID is in markedPaperIds
    return papers.filter((paper) => markedPaperIds.includes(paper._id));
  };

  //get user's All marks
  useEffect(() => {
    const getUserMarks = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/marks/${props.id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log(response.data);
          setUserMarks(response.data);
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalPapers /
                response?.data?.pagination?.limit
            )
          );
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {});
    };

    getUserMarks();
  }, [isOpenModal, props.id]);

  //get papers
  useEffect(() => {
    const getPapers = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/papers`,
        params: {
          page: pageNumber,
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log("Papers" + response.data);
          setPapers(response.data);
          setActivePaper(response.data[0]._id);
          loadingCompleted();
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalPapers /
                response?.data?.pagination?.limit
            )
          );
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {});
    };

    getPapers();
  }, [pageNumber]);

  // get grades by user and paper
  useEffect(() => {
    const getSettings = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/marks/${props.id}/${activePaper}`,

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log("Marks");
          // console.log(response.data);
          setGrades(response.data);

          // console.log(grades)
        })
        .catch((err) => {
          // console.log("Called");
          // console.log(err);
        })
        .finally(() => {});
    };

    getSettings();
  }, [activePaper, props.id]);

  useEffect(() => {
    if (grades && grades.length > 0) {
      const grade = grades[0]; // Assuming you only need the first element
      setInitialValues({
        paperTitle: activePaper,
        reading: grade.reading || 0,
        logicalAndProblemSolving: grade.logicalAndProblemSolving || 0,
        biology: grade.biology || 0,
        chemistry: grade.chemistry || 0,
        physicsAndMaths: grade.physicsAndMaths || 0,
        didNotAnswer: grade.didNotAnswer || 0,
        wrongAnswer: grade.wrongAnswer || 0,
        corrcetAnswer: grade.corrcetAnswer || 0,
        lostmarks: grade.lostmarks || 0,
        total: grade.total || 0,
      });
    }
  }, [grades, activePaper]);

  //change Marks
  const changeMarks = async (values: FormValues) => {
    const accessToken = await getAccess();

    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}lms/marks/${props.id}/${activePaper}`,
      // params: {
      //   studentId: props.id,
      //   paperId: activePaper,
      // },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        reading: values.reading,
        logicalAndProblemSolving: values.logicalAndProblemSolving,
        biology: values.biology,
        chemistry: values.chemistry,
        physicsAndMaths: values.physicsAndMaths,
        didNotAnswer: values.didNotAnswer,
        wrongAnswer: values.wrongAnswer,
        corrcetAnswer: values.corrcetAnswer,
        lostmarks: values.lostmarks,
        total: values.total,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          props.added();
          alert("Grades Updated");
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
          {dataloaded ? (
            <>
              <GradesIcon classes={"w-4 h-4 text-white"} />
              <p className="">Manage Grades</p>
            </>
          ) : (
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              className="animate-spin h-7 w-7 text-blue-600"
            >
              <path
                fill="#fff"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          )}
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
                      onSubmit={changeMarks}
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
                                  // console.log(
                                  //   "Selected value:",
                                  //   e.target.value
                                  // );
                                  setActivePaper(e.target.value);
                                }}
                                className={`${form().input()} ${
                                  errors.paperTitle && touched.paperTitle
                                    ? form().labelError()
                                    : ""
                                }`}
                              >
                                <option key="1" value="">
                                  Select Paper
                                </option>
                                {/* Render options based on filtered papers */}
                                {filterPapersByUserMarks().map((option) => (
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
                            <label htmlFor="reading" className={form().label()}>
                              Reading Skills
                            </label>
                            <Field
                              name="reading"
                              type="number"
                              className={`${form().input()} ${
                                errors.reading && touched.reading
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="reading"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="logicalAndProblemSolving"
                              className={form().label()}
                            >
                              Logic and Problem Solving
                            </label>
                            <Field
                              name="logicalAndProblemSolving"
                              type="number"
                              className={`${form().input()} ${
                                errors.logicalAndProblemSolving &&
                                touched.logicalAndProblemSolving
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="logicalAndProblemSolving"
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
                              htmlFor="didNotAnswer"
                              className={form().label()}
                            >
                              Did not Answer
                            </label>
                            <Field
                              name="didNotAnswer"
                              type="number"
                              className={`${form().input()} ${
                                errors.didNotAnswer && touched.didNotAnswer
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="didNotAnswer"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="wrongAnswer"
                              className={form().label()}
                            >
                              Wrong Answer
                            </label>
                            <Field
                              name="wrongAnswer"
                              type="number"
                              className={`${form().input()} ${
                                errors.wrongAnswer && touched.wrongAnswer
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="wrongAnswer"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="corrcetAnswer"
                              className={form().label()}
                            >
                              Correct Answer
                            </label>
                            <Field
                              name="corrcetAnswer"
                              type="number"
                              className={`${form().input()} ${
                                errors.corrcetAnswer && touched.corrcetAnswer
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="corrcetAnswer"
                              component="div"
                            />
                          </div>

                          <div className={form().formDiv()}>
                            <label
                              htmlFor="lostmarks"
                              className={form().label()}
                            >
                              Lost Marks
                            </label>
                            <Field
                              name="lostmarks"
                              type="number"
                              className={`${form().input()} ${
                                errors.lostmarks && touched.lostmarks
                                  ? form().labelError()
                                  : ""
                              }`}
                            />
                            <ErrorMessage
                              className={form().errorMessage()}
                              name="lostmarks"
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
                          <p className="text-red-500">Please wait until the model closes automatically after submitting.</p>
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
