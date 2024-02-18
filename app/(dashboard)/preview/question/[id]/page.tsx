"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@/components/icons";

import Modal from "@/components/modal";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

interface Question {
  answers: { number: number; answer: string; _id: string }[];
  correctAnswer: number[];
  explaination: string;
  question: string;
  subCategory: {
    name: string;
    __v: number;
    _id: string;
  };
  subject: { _id: string; name: string; subCategories: string[]; __v: number };
  type: string;
  __v: number;
  _id: string;
  difficulty: string;
}

export default async function Page({ params }: { params: { id: string } }) {
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
      const handleSetAnswersSelected = (correctAnswer: number[]) => {
        setAnswersSelected((prevAnswerList) =>
          prevAnswerList.map((answer, index) => correctAnswer.includes(index))
        );
      };

      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions/${params.id}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestion(response.data);
          const correctAnswer = response.data.correctAnswer;
          handleSetAnswersSelected(correctAnswer);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQuestion();
  }, [params.id]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <div
          className="rounded-full h-7 w-7 flex items-center justify-center hover:bg-white cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon classes={"h-6 w-6 text-blue-600"} />
        </div>
        {question && (
          <div dangerouslySetInnerHTML={{ __html: question.question }} />
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
                  className="before:content[''] peer shadow relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-100 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:bg-green-300 before:opacity-0 before:transition-opacity checked:border-green-600 checked:bg-green-600"
                  id="blue"
                  checked={answersSelected[index]}
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
                className="bg-white p-3 rounded-xl w-full shadow"
                dangerouslySetInnerHTML={{ __html: answer.answer }}
              />
            </div>
          ))}
      </div>
      {question?.explaination && (
        <Modal
          viewButton={
            <button className="bg-green-600 rounded-xl shadow px-4 py-1 flex items-center justify-center">
              <p className="text-white font-medium capitalize">
                view explanation
              </p>
            </button>
          }
          modalTitle={"Explanation"}
          children={
            <div dangerouslySetInnerHTML={{ __html: question.explaination }} />
          }
          closeBtn
          modalMaxWidth="max-w-3xl"
        />
      )}
    </div>
  );
}
