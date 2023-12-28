"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";

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

export default function QuizDetailsPage({
  params,
}: {
  params: { questionNo: string; quizId: string };
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

  useEffect(() => {
    const getQuestion = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions/656272a15924ffb42375caec`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestion(response.data);
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

  return (
    <div className="w-full">
      {question && (
        <div
          dangerouslySetInnerHTML={{ __html: question.question }}
          className="font-semibold"
        />
      )}
      <div className="flex flex-col gap-2 mt-5">
        {question &&
          question?.answers.length > 0 &&
          question.answers.map((answer, index) => (
            <div className="flex gap-5" key={answer._id}>
              <Checkbox
                isSelected={answersSelected[index]}
                onValueChange={() =>
                  setAnswersSelected((prev) => [
                    ...prev.slice(0, index),
                    !prev[index],
                    ...prev.slice(index),
                  ])
                }
              ></Checkbox>
              <div
                className="bg-white p-3 rounded-xl w-full"
                dangerouslySetInnerHTML={{ __html: answer.answer }}
              />
            </div>
          ))}
      </div>
      {question && (
        <div
          className="border border-blue p-3 rounded-xl w-full mt-5"
          dangerouslySetInnerHTML={{ __html: question.explaination }}
        />
      )}
    </div>
  );
}
