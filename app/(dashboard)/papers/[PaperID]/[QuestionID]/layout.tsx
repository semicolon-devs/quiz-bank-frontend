"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Modal from "@/components/modal";
import QuestionBlock from "@/components/questionBlock";

import { ExclamationMarkIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { getUserDetails } from "@/helpers/userDetails";

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
  const [answeredArray, setAnsweredArray] = useState<number[]>([]);
  const [QPaperError, setQPaperError] = useState<boolean>(false);
  const [QPaperName, setQPaperName] = useState<string>();
  const [QPaperId, setQPaperId] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const getQuestionBlocks = () => {
      setLoadingQBlocks(true);
      const userID = getUserDetails()?._id;
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/status/${userID}/${params.PaperID}`,
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
        url: `${BASE_URL}papers/${params.PaperID}/info`,
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
          <div className="border-b border-blue-100 p-3 flex justify-between items-center">
            <p className="font-bold text-lg uppercase">
              {!loadingQPaper ? QPaperName : "Loading..."} - {QPaperId}
            </p>
            <Modal
              viewButton={
                <button className="bg-red-400 px-4 py-1 outline-none rounded-md">
                  <p className="text-white font-medium">Quit Paper</p>
                </button>
              }
              modalTitle={"Quit Paper"}
              children={
                <>
                  <p className="">Are you sure you want to Quit the Quiz?</p>
                  <p className="text-sm italic">
                    Your progress will be saved and you can resume the quiz
                    later
                  </p>
                </>
              }
            />
          </div>
          <div className="flex h-full">
            <div className="p-6 h-max w-[260px]">
              <div className="grid grid-cols-5 gap-2 w-max">
                {!loadingQBlocks && (
                  <QuestionBlock
                    totalQuestions={totalQuestions}
                    answeredArray={answeredArray}
                    directingURL={`/papers/${params.PaperID}`}
                  />
                )}
              </div>
            </div>
            <div className="p-3 flex h-full w-full border-l border-blue-100 overflow-y-auto">
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
