"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Spinner from "@/components/spinner";
import Modal from "@/components/modal";

import { CheckIcon, CloseIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { RootState, useAppSelector } from "@/store";

interface Question {
  answers: { number: number; answer: string; _id: string }[];
  question: string;
  type: string;
  __v: number;
}

export default function PaperQuestionPage({
  params,
}: {
  params: { PaperID: string; QuestionID: string };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [answersSelected, setAnswersSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<number[]>([]);
  const [explanation, setExplanation] = useState<string>("");
  const [correctAnswersArray, setCorrectAnswersArray] = useState<
    { index: number; isCorrect: boolean }[]
  >([]);

  const router = useRouter();

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getQuestion = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.PaperID}/${params.QuestionID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestion(response.data.question);
          response.data.answer?.answer &&
            setSubmittedAnswers(response.data.answer.answer);
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getAnswer = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/answer/${params.PaperID}/${params.QuestionID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCorrectAnswer(response.data.correctAnswer);
          setExplanation(response.data.explaination);
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getQuestionBlockSubmitted = () => {
      const userID = userDetails?._id;
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/answers-status/${userID}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCorrectAnswersArray(response.data.answers);
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {});
    };

    getQuestionBlockSubmitted();
    getQuestion();
    getAnswer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  function setSubmittedAnswers(submittedAnswers: number[]) {
    for (let i = 0; i < answersSelected.length; i++) {
      if (submittedAnswers.includes(i)) {
        setAnswersSelected((prev) => {
          const newArray = [...prev];
          newArray[i] = true;
          return newArray;
        });
      }
    }
  }

  function getTrueIndexes(): number[] {
    let trueIndexes = [];
    for (let i = 0; i < answersSelected.length; i++) {
      if (answersSelected[i] === true) {
        trueIndexes.push(i);
      }
    }
    return trueIndexes;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 flex-grow">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="overflow-auto h-full gap-3 flex flex-col">
            <p className="font-bold text-blue-600">
              Question No. {params.QuestionID}
            </p>
            <div className="w-full flex justify-between items-center">
              {question && (
                <p
                  dangerouslySetInnerHTML={{ __html: question.question }}
                  className="font-semibold"
                />
              )}
            </div>
            <div className="w-full flex justify-between">
              {correctAnswersArray[parseInt(params.QuestionID) - 1]
                ?.isCorrect &&
              correctAnswersArray[parseInt(params.QuestionID) - 1]
                ?.isCorrect ? (
                <div className="flex gap-2 items-center">
                  <CheckIcon classes="h-4 w-4 text-green-600" />
                  <p className="text-green-600 font-medium">Correct Answer</p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <CloseIcon classes="h-4 w-4 text-red-600" />
                  <p className="text-red-600 font-medium">Incorrect Answer</p>
                </div>
              )}

              {explanation && (
                <Modal
                  viewButton={
                    <button className="bg-blue-300 rounded-xl shadow px-4 py-1 flex items-center justify-center">
                      <p className="text-white font-medium capitalize">
                        view explanation
                      </p>
                    </button>
                  }
                  modalTitle={"Explanation"}
                  closeBtn
                  modalMaxWidth="max-w-3xl"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: explanation,
                    }}
                  />
                </Modal>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {question &&
                question?.answers.length > 0 &&
                question.answers.map((answer, index) => (
                  <div className="flex gap-5 items-center" key={answer._id}>
                    <label
                      className="relative flex items-start cursor-pointer"
                      htmlFor="answered"
                    >
                      <input
                        type="checkbox"
                        className={`before:content[''] peer shadow relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-100 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-opacity ${
                          correctAnswer &&
                          correctAnswer.includes(index) &&
                          answersSelected[index]
                            ? "checked:border-green-600 checked:bg-green-600 before:bg-green-300"
                            : "checked:border-red-600 checked:bg-red-600 before:bg-red-300"
                        }`}
                        id="answered"
                        checked={answersSelected[index]}
                        readOnly
                      />
                      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2.5 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <div
                      className={`bg-white p-3 rounded-xl w-full shadow ${
                        correctAnswer &&
                        correctAnswer.includes(index) &&
                        "border border-green-600"
                      }`}
                      dangerouslySetInnerHTML={{ __html: answer.answer }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-500 px-4 py-1 outline-none rounded-md"
              onClick={() =>
                router.push(
                  `${
                    parseInt(params.QuestionID) > 1
                      ? parseInt(params.QuestionID) - 1
                      : 1
                  }`
                )
              }
            >
              <p className="text-white font-medium">Prev</p>
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-500 px-4 py-1 outline-none rounded-md"
              onClick={() => router.push(`${parseInt(params.QuestionID) + 1}`)}
            >
              <p className="text-white font-medium">Next</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
