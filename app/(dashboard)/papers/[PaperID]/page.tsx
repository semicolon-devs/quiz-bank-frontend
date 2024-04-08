"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import { PaperDetails } from "@/types";
import { RightArrowWithTailIcon } from "@/components/icons";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

export default function PaperDetailsPage({
  params,
}: {
  params: { PaperID: string };
}) {
  const [paper, setPaper] = useState<PaperDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/${params.PaperID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPaper(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQPapers();
  }, [params.PaperID]);

  return (
    <div className="w-full">
      {paper ? (
        <div className="w-full flex flex-col gap-4">
          <div className="bg-white w-full flex items-center justify-between p-3 rounded-xl shadow">
            <p className="text-blue-600 capitalize text-3xl font-semibold">
              {paper.name}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center"
              onClick={() =>
                router.push(`${UrlSlugType.PAPERS}/${params.PaperID}/1`)
              }
            >
              <p className="text-white text-base font-medium">Start Quiz</p>
              <RightArrowWithTailIcon classes={"w-5 h-5 text-white"} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-xl shadow">
              <div className="flex">
                <p className="w-1/2 font-medium">Paper code</p>
                <p className="w-1/2 uppercase">{paper.paperId}</p>
              </div>
              <div className="flex">
                <p className="w-1/2 font-medium">Paper type</p>
                <p className="w-1/2 lowercase">{paper.paperType}</p>
              </div>
              <div className="flex">
                <p className="w-1/2 font-medium">No of questions</p>
                <p className="w-1/2 lowercase">{paper.questionsCount}</p>
              </div>
              <div className="flex">
                <p className="w-1/2 font-medium">Paper</p>
                <p className="w-1/2">
                  {paper.isTimed ? "is timed" : "not timed"}
                </p>
              </div>
              {paper.isTimed && (
                <div className="flex">
                  <p className="w-1/2 font-medium">Duration</p>
                  <p className="w-1/2">{paper.timeInMinutes} minutes</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-white p-3 rounded-xl shadow">
                <p className="text-blue-600 capitalize text-xl font-medium">
                  Previous Attempts
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl shadow flex items-center justify-between">
                <div className="">
                  <p className="text-blue-600 font-medium">
                    {new Date("2023-03-03").toLocaleString()}
                  </p>
                </div>
                <div className="w-1/5">
                  <p className="text-blue-600 text-xl font-semibold text-end">
                    12/20
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl shadow flex items-center justify-between">
                <div className="">
                  <p className="text-blue-600 font-medium">
                    {new Date("2023-05-03").toLocaleString()}
                  </p>
                </div>
                <div className="w-1/5">
                  <p className="text-blue-600 text-xl font-semibold text-end">
                    18/20
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}
