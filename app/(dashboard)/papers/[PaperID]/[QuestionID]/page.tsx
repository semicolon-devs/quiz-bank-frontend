"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Spinner from "@/components/spinner";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { getUserID } from "@/helpers/userDetails";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

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

  const router = useRouter();

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
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQuestion();
  }, []);

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

  const handleSubmit = () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}answers/submit`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        userId: getUserID(),
        paperId: params.PaperID,
        questionIndex: params.QuestionID,
        answer: getTrueIndexes(),
        submitAt: new Date(),
      },
    };
    axios(axiosConfig)
      .then((response) => {
        toast.success(
          `Answers ${getTrueIndexes()} has been submitted to Question no ${
            params.QuestionID
          }`
        );
        router.push(
          `${UrlSlugType.PAPERS}/${params.PaperID}/${
            parseInt(params.QuestionID) + 1
          }`
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
            <div className="flex flex-col gap-2">
              {question &&
                question?.answers.length > 0 &&
                question.answers.map((answer, index) => (
                  <div className="flex gap-5 items-center" key={answer._id}>
                    <label
                      className="relative flex items-start cursor-pointer"
                      htmlFor="blue"
                    >
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-100 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:bg-blue-300 before:opacity-0 before:transition-opacity checked:border-blue-600 checked:bg-blue-600"
                        id="blue"
                        checked={answersSelected[index]}
                        onChange={() =>
                          setAnswersSelected((prev) => {
                            let newArray = [...prev];
                            newArray[index] = !newArray[index];
                            return newArray;
                          })
                        }
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
                      className="bg-white p-3 rounded-xl w-full"
                      dangerouslySetInnerHTML={{ __html: answer.answer }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-3">
            <button
              className="bg-blue-600 hover:bg-blue-500 px-4 py-1 outline-none rounded-md"
              onClick={handleSubmit}
            >
              <p className="text-white font-medium">Submit Answer</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
