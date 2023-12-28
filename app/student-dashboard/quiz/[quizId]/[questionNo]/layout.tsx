"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Skeleton } from "@nextui-org/skeleton";

import axios from "axios";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import QuitQuizModal from "./modals/QuitQuizModal";
import { getUserDetails } from "@/helpers/userDetails";

import { ExclamationMarkIcon } from "@/components/icons";

export default function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { questionNo: string; quizId: string };
}) {
  const [loadingQBlocks, setLoadingQBlocks] = useState<boolean>(false);
  const [loadingQPaper, setLoadingQPaper] = useState<boolean>(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answeredArray, setAnsweredArray] = useState<number[]>();
  const [QPaperError, setQPaperError] = useState<boolean>(false);
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
      setLoadingQBlocks(true);
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
          setLoadingQBlocks(false);
        });
    };

    const getQPaperInfo = () => {
      setLoadingQPaper(true);
      setQPaperError(false);
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
          setQPaperError(true);
        })
        .finally(() => {
          setLoadingQPaper(false);
        });
    };

    getQPaperInfo();
    getQuestionBlocks();
  }, []);

  return (
    <section className="w-full h-full">
      {!QPaperError ? (
        <>
          <div className="border-b border-dark/25 p-3 flex justify-between items-center">
            <p className="font-bold text-lg uppercase">
              {!loadingQPaper ? QPaperName : "Loading..."} - {QPaperId}
            </p>
            <QuitQuizModal />
          </div>
          <div className="flex">
            <div className="p-6 h-max w-[260px]">
              <div className="grid grid-cols-5 gap-2 w-max">
                {!loadingQBlocks
                  ? Array.from({ length: totalQuestions }, (block, i) => i).map(
                      (i) => (
                        <div
                          key={i}
                          className={`border border-blue/25 rounded-md w-9 h-7 flex justify-center items-center font-semibold cursor-pointer hover:bg-blue/20`}
                          onClick={() =>
                            router.push(
                              `/student-dashboard/quiz/${params.quizId}/${
                                i + 1
                              }`
                            )
                          }
                        >
                          {i + 1}
                        </div>
                      )
                    )
                  : Array.from({ length: 20 }, (block, i) => i).map((i) => (
                      <Skeleton
                        className="rounded-md w-9 h-7 border border-blue/10"
                        key={i}
                      >
                        <div className="rounded-md w-9 h-7"></div>
                      </Skeleton>
                    ))}
              </div>
            </div>
            <div className="p-3 flex flex-grow border-l border-dark/25">
              {children}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-lg flex flex-row gap-5 items-center justify-center p-5">
            <ExclamationMarkIcon classes="w-5 h-5" />
            <p className="text-center font-semibold capitalize">
              error occured loading question paper
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
