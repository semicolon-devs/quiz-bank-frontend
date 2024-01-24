"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

interface Question {
  answers: { number: number; answer: string; _id: string }[];
  question: string;
  type: string;
  __v: number;
}

export default async function QuizDetailsPage({
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
        url: `${BASE_URL}papers/${params.quizId}/${params.questionNo}`,
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
    <div className="w-full h-full flex flex-col gap-5 flex-grow">
      {loading ? (
        <Spinner label="Loading ..." color="primary" labelColor="primary" />
      ) : (
        <>
          <div className="overflow-auto h-96 gap-3 flex flex-col">
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
                  <div className="flex gap-5" key={answer._id}>
                    <Checkbox
                    // isSelected={answersSelected[index]}
                    // onValueChange={() =>
                    //   setAnswersSelected((prev) => [
                    //     ...prev.slice(0, index),
                    //     !prev[index],
                    //     ...prev.slice(index),
                    //   ])
                    // }
                    ></Checkbox>
                    <div
                      className="bg-white p-3 rounded-xl w-full"
                      dangerouslySetInnerHTML={{ __html: answer.answer }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full flex justify-end items-center">
            <Button color="primary">Submit</Button>
          </div>
        </>
      )}
    </div>
  );
}
