"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { getUserID } from "@/helpers/userDetails";

import { FilledCheckIcon } from "@/components/icons";

export default function PaperDetailsPage({
  params,
}: {
  params: { PaperID: string };
}) {
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>();
  const [totalQuestions, setTotalQuestions] = useState<number>();
  const [paperInfo, setPaperInfo] = useState<{
    name: string;
    paperId: string;
  }>();

  useEffect(() => {
    const hasFinishedQuiz = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/has-finished/${getUserID()}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response);
          setHasFinished(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getMarks = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/marks/${getUserID()}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response);
          setCorrectAnswers(response.data.totalMarks);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getQuizInfo = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.PaperID}/info`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPaperInfo(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getQuizTotalQuestions = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/status/${getUserID()}/${params.PaperID}`,
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
    <div className="flex flex-col h-full w-full">
      <div className="bg-white w-full flex items-center justify-between p-3 rounded-xl shadow">
        <p className="text-blue-600 capitalize text-3xl font-semibold">
          {paperInfo?.name} -{" "}
          <span className="uppercase">{paperInfo?.paperId}</span>
        </p>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {/* {hasFinished ? ( */}
        <div className="bg-white w-72 h-max flex justify-center items-center flex-col rounded-xl shadow p-3">
          <FilledCheckIcon classes="text-green-500 w-16 h-16 mt-5" />
          <p className="uppercase font-semibold text-sm mt-5">Results</p>
          <p className="text-3xl uppercase font-extrabold">
            {correctAnswers}/{totalQuestions}
          </p>
          <button className="w-full mt-5 uppercase font-semibold bg-blue-600 rounded-md py-2 text-white">
            Review Answers
          </button>
        </div>
      </div>
      {/* ) : (
        <div className="p-5">
          <p className="uppercase font-bold text-lg">
            You haven't taken this quiz
          </p>
        </div>
      )} */}
    </div>
  );
}
