"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Checkbox } from "@nextui-org/checkbox";

import { BASE_URL } from "@/config/apiConfig";

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

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [answersSelected, setAnswersSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = () => {
    setLoading(true);
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}questions/${params.id}`,
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

  return (
    <div>
      {question && (
        <div dangerouslySetInnerHTML={{ __html: question.question }} />
      )}
      <div className="flex flex-col gap-2 mt-5">
        {question &&
          question?.answers.length > 0 &&
          question.answers.map((answer, index) => (
            <div className="flex gap-5" key={answer._id}>
              <Checkbox
                isSelected={answersSelected[index + 1]}
                onValueChange={() =>
                  setAnswersSelected((prev) => [
                    ...prev.slice(0, index + 1),
                    !prev[index + 1],
                    ...prev.slice(index + 2),
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
    </div>
  );
}