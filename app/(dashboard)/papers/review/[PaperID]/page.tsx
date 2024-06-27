"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { RootState, useAppSelector } from "@/store";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import { FilledCheckIcon } from "@/components/icons";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

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
          setHasFinished(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    const getMarks = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/marks/${userDetails?._id}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log(response);
          setCorrectAnswers(response.data.totalMarks);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    const getQuizInfo = async () => {
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
          setPaperInfo(response.data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    const getQuizTotalQuestions = async () => {
      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}answers/status/${userDetails?._id}/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log(response);
          setTotalQuestions(response.data.totalQuestions);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    hasFinishedQuiz();
    getMarks();
    getQuizInfo();
    getQuizTotalQuestions();
  }, [params, userDetails]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="bg-white w-full flex items-center justify-between p-3 rounded-xl shadow">
        <p className="text-blue-600 capitalize text-3xl font-semibold">
          {paperInfo?.name} -{" "}
          <span className="uppercase">{paperInfo?.paperId}</span>
        </p>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        {
        // hasFinished ? (
          <div className="bg-white w-72 h-max flex justify-center items-center flex-col rounded-xl shadow p-3">
            <FilledCheckIcon classes="text-green-500 w-16 h-16 mt-5" />
            <p className="uppercase font-semibold text-sm mt-5">Results</p>
            <p className="text-3xl uppercase font-extrabold">
              {correctAnswers}/{totalQuestions}
            </p>
            <button
              className="w-full mt-5 uppercase font-semibold bg-blue-600 rounded-md py-2 text-white"
              onClick={() =>
                router.push(`${UrlSlugType.PAPERS_REVIEW}/${params.PaperID}/1`)
              }
            >
              Review Answers
            </button>
          </div>
        // ) : (
        //   <div className="p-5">
        //     <p className="uppercase font-bold text-lg">
        //       You haven&apos;t taken this quiz
        //     </p>
        //   </div>
        // )
      }
      </div>
    </div>
  );
}
