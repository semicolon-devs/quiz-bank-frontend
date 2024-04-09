"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Countdown, { CountdownRenderProps } from "react-countdown";

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
import toast from "react-hot-toast";
import { RootState, useAppSelector } from "@/store";

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
  const [PaperMinutes, setPaperMinutes] = useState<number>();

  const router = useRouter();

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  const handleCompleteQuiz = () => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}answers/finish`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        userId: userDetails?._id,
        paperId: params.PaperID,
        submitAt: new Date(),
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        router.push(`${UrlSlugType.PAPERS_REVIEW}/${params.PaperID}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getQuestionBlocks = () => {
      setLoadingQBlocks(true);
      const userID = userDetails?._id;
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
          if (parseInt(params.QuestionID) > response.data.totalQuestions) {
            router.push(`${UrlSlugType.PAPERS}/${params.PaperID}/1`);
          }
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
          setPaperMinutes(response.data.timeInMinutes);
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
  }, [params, router]);

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <div className="bg-red-400 px-4 py-1 rounded-md shadow w-40 flex items-center justify-center text-white font-medium">
          timer complete
        </div>
      );
    } else {
      return (
        <div className="bg-red-400 px-4 py-1 rounded-md shadow w-40 flex items-center justify-center">
          <span className="text-white font-medium">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
      );
    }
  };

  return (
    <section className="w-full h-[calc(100vh-96px)]">
      {!QPaperError ? (
        <>
          <div className="border-b border-blue-100 flex justify-between items-center h-11">
            <div className="flex items-center">
              <div className="w-[228px] flex justify-start items-center">
                <Modal
                  viewButton={
                    <button className="cursor-pointer flex items-center justify-center">
                      <ChevronLeftIcon classes={"h-6 w-6 text-blue-600"} />
                      <p className="font-semibold uppercase text-blue-600">
                        back
                      </p>
                    </button>
                  }
                  modalTitle={"Quit Paper"}
                  submitBtn={
                    <button className="bg-red-400 px-4 py-2 rounded-md">
                      <p className="text-white text-sm font-medium">
                        Quit Paper
                      </p>
                    </button>
                  }
                  handleSubmit={() =>
                    router.push(`${UrlSlugType.PAPERS}/${params.PaperID}`)
                  }
                >
                  <>
                    <p className="">Are you sure you want to Quit the Paper?</p>
                    {/* <p className="text-sm italic">
                  Your progress will be saved and you can resume the quiz
                  later
                </p> */}
                  </>
                </Modal>
              </div>
              <p className="font-bold text-lg uppercase text-blue-600">
                {!loadingQPaper ? QPaperName : "Loading..."} - {QPaperId}
              </p>
            </div>
            {PaperMinutes && (
              <Countdown
                date={Date.now() + PaperMinutes * 60000}
                renderer={renderer}
                onComplete={() => {
                  toast.success("Allocated time is over");
                  handleCompleteQuiz();
                }}
              />
            )}
            <Modal
              viewButton={
                <button className="bg-blue-600 hover:bg-blue-500 px-4 py-1 outline-none rounded-md">
                  <p className="text-white font-medium">Finalize Submission</p>
                </button>
              }
              modalTitle={"Submit Paper"}
              submitBtn={
                <button className="bg-blue-400 px-4 py-2 rounded-md">
                  <p className="text-white text-sm font-medium">
                    Confirm Submission
                  </p>
                </button>
              }
              handleSubmit={() => handleCompleteQuiz()}
            >
              <>
                <p className="">Are you sure you want to submit the Paper?</p>
                {answeredArray.length >= totalQuestions ? (
                  <div className="mt-2 flex gap-2">
                    <FilledCheckIcon classes={"w-5 h-5 text-green-600"} />
                    <p className="text-sm text-green-600">
                      All questions has been answered
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 flex gap-2">
                    <ExclamationMarkIcon classes={"w-5 h-5 text-red-600"} />
                    <p className="text-sm text-red-600">
                      {`Only ${answeredArray.length} out of ${totalQuestions} questions have been answered`}
                    </p>
                  </div>
                )}
              </>
            </Modal>
          </div>
          <div className="flex">
            <div className="p-2 h-max w-[228px]">
              <div className="grid grid-cols-5 gap-2 w-max">
                {!loadingQBlocks && (
                  <QuestionBlock
                    totalQuestions={totalQuestions}
                    answeredArray={answeredArray}
                    directingURL={`/papers/${params.PaperID}`}
                    activeQuestion={params.QuestionID}
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
