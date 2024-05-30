"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { RootState, useAppSelector } from "@/store";

import Modal from "@/components/modal";
import QuestionBlock from "@/components/questionBlock";

import {
  ExclamationMarkIcon,
  ChevronLeftIcon,
  FilledCheckIcon,
} from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import SectionTitle from "@/components/sectionTitle";

export default function PaperTemplate({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { PaperID: string; QuestionID: string };
}) {
  const [loadingQBlocks, setLoadingQBlocks] = useState<boolean>(false);
  const [loadingQPaper, setLoadingQPaper] = useState<boolean>(false);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [QPaperError, setQPaperError] = useState<boolean>(false);
  const [QPaperName, setQPaperName] = useState<string>();
  const [QPaperId, setQPaperId] = useState<string>();
  const [correctAnswersArray, setCorrectAnswersArray] = useState<
    { index: number; isCorrect: boolean }[]
  >([]);

  const router = useRouter();

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const hasFinishedQuiz = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/has-finished/${userDetails?._id}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    const getQuestionBlockSubmitted = async () => {
      setLoadingQBlocks(true);
      const userID = userDetails?._id;

      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/answers-status/${userID}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setTotalQuestions(response.data.totalQuestions);
          setCorrectAnswersArray(response.data.answers);
          if (parseInt(params.QuestionID) > response.data.totalQuestions) {
            router.push(`${UrlSlugType.PAPERS_REVIEW}/${params.PaperID}/1`);
          }
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoadingQBlocks(false);
        });
    };

    const getQPaperInfo = async () => {
      setLoadingQPaper(true);
      setQPaperError(false);

      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.PaperID}/info`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQPaperName(response.data.name);
          setQPaperId(response.data.paperId);
        })
        .catch((err) => {
          setQPaperError(true);
        })
        .finally(() => {
          setLoadingQPaper(false);
        });
    };

    hasFinishedQuiz();
    getQPaperInfo();
    getQuestionBlockSubmitted();
  }, [params, router, userDetails]);

  const getCorrectAnswersArray = () => {
    const correctAnswerBlocks = correctAnswersArray
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.index);
    return correctAnswerBlocks;
  };

  return (
    <section className="w-full h-[calc(100vh-96px)]">
      {!QPaperError ? (
        <>
          <SectionTitle
            title={`Review answers : ${
              !loadingQPaper ? QPaperName : "Loading..."
            } - ${QPaperId}`}
            
          />
          <div className="border-b border-blue-100 flex justify-between items-center"></div>
          <div className="flex">
            <div className="p-2 h-max w-[228px]">
              <div className="grid grid-cols-5 gap-2 w-max">
                {!loadingQBlocks && (
                  <QuestionBlock
                    totalQuestions={totalQuestions}
                    correctAnswersArray={getCorrectAnswersArray()}
                    directingURL={`/papers/review/${params.PaperID}`}
                    activeQuestion={params.QuestionID}
                    review
                  />
                )}
              </div>
            </div>
            <div className="p-3 flex h-[calc(100vh-140px)] w-full border-l border-blue-100 overflow-y-auto">
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
