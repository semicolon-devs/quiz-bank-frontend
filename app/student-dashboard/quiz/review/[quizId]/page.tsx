"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { getUserID } from "@/helpers/userDetails";

import { Button } from "@nextui-org/button";

import { FilledCheckIcon } from "@/components/icons";

export default async function QuizDetailsPage({
  params,
}: {
  params: { quizId: string };
}) {
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>();
  const [totalQuestions, setTotalQuestions] = useState<number>();
  const [quizInfo, setQuizInfo] = useState<{
    name: string;
    paperId: string;
  }>();

  useEffect(() => {
    const hasFinishedQuiz = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/has-finished/${getUserID()}/${params.quizId}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setHasFinished(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getMarks = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/marks/${getUserID()}/${params.quizId}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCorrectAnswers(response.data.totalMarks);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getQuizInfo = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.quizId}/info`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuizInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getQuizTotalQuestions = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/status/${getUserID()}/${params.quizId}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setTotalQuestions(response.data.totalQuestions);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    hasFinishedQuiz();
    getMarks();
    getQuizInfo();
    getQuizTotalQuestions();
  }, [params]);

  return (
    <div className="flex justify-center items-center h-full">
      {hasFinished ? (
        <div className="bg-white w-72 h-max flex justify-center items-center flex-col rounded-lg p-5">
          <FilledCheckIcon classes="text-green-500 w-16 h-16" />
          <p className="uppercase font-semibold text-sm mt-5">
            quiz {quizInfo && quizInfo.paperId}
          </p>
          <p className="uppercase font-bold text-lg">
            {quizInfo && quizInfo.name}
          </p>
          <p className="text-3xl uppercase font-extrabold">
            {correctAnswers}/{totalQuestions}
          </p>
          <Button
            color="primary"
            className="w-full mt-5 uppercase font-semibold"
          >
            Review Answers
          </Button>
        </div>
      ) : (
        <div className="p-5">
          <p className="uppercase font-bold text-lg">
            You haven't taken this quiz
          </p>
        </div>
      )}
    </div>
  );
}
