"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import QuitQuizModal from "./modals/QuitQuizModal";
import { getUserDetails } from "@/helpers/userDetails";

export default function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { questionNo: string; quizId: string };
}) {
  const [loading, setLoading] = useState<boolean>();
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answeredArray, setAnsweredArray] = useState<number[]>();
  const [QPaperName, setQPaperName] = useState<string>();
  const [QPaperId, setQPaperId] = useState<string>();

  const router = useRouter();

  const questionBlockStatus = (status: string) => {
    if (status === "not viewed") {
      return "text-blue bg-white";
    } else if (status === "answered") {
      return "text-white bg-blue";
    } else if (status === "active") {
      return "text-blue bg-blue/25";
    } else {
      return "text-blue bg-white";
    }
  };

  useEffect(() => {
    const getQuestionBlocks = () => {
      setLoading(true);
      const userID = getUserDetails()?._id;
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/status/${userID}/${params.quizId}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setTotalQuestions(response.data.totalQuestions);
          setAnsweredArray(response.data.answered);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getQPaperInfo = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.quizId}/info`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQPaperName(response.data.name);
          setQPaperId(response.data.paperId);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQPaperInfo();
    getQuestionBlocks();
  }, []);

  return (
    <section className="w-full h-full">
      <div className="border-b border-dark/25 p-3 flex justify-between items-center">
        <p className="font-bold text-lg uppercase">
          {QPaperName} - {QPaperId}
        </p>
        {/* <QuitQuizModal /> */}
      </div>
      <div className="flex">
        <div className="p-6 h-max w-[260px]">
          <div className="grid grid-cols-5 gap-2 w-max">
            {Array.from({ length: totalQuestions }, (block, i) => i).map(
              (i) => (
                <div
                  key={i}
                  className={`border border-blue/25 rounded-md w-9 h-7 flex justify-center items-center font-semibold cursor-pointer hover:bg-blue/20`}
                  onClick={() =>
                    router.push(
                      `/preview/quiz/${params.quizId}/${i + 1}`
                    )
                  }
                >
                  {i + 1}
                </div>
              )
            )}
          </div>
        </div>
        <div className="p-6 flex flex-grow border-l border-dark/25 ">{children}</div>
      </div>
    </section>
  );
}
