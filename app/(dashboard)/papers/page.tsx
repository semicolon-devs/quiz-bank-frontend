"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import SectionTitle from "@/components/sectionTitle";

import { ClockIcon } from "@/components/icons";

import { getAccess } from "@/helpers/token";
import { BASE_URL } from "@/config/apiConfig";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

interface QPaper {
  isTimed: boolean;
  name: string;
  paperId: string;
  paperType: string;
  questions: any[];
  timeInMinutes: number;
  __v: number;
  _id: string;
}

export default function PapersPage() {
  const [loaiding, setLoading] = useState<boolean>(false);
  const [paperList, setPaperList] = useState<QPaper[]>();

  const router = useRouter();

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPaperList(response.data.result);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQPapers();
  }, []);

  return (
    <div>
      <SectionTitle title="Quizes" />
      <div className="w-full flex flex-col gap-3">
        {paperList &&
          paperList.map((paper) => (
            <div
              className="bg-white rounded-xl overflow-hidden shadow w-full p-4 flex flex-col justify-between"
              key={paper._id}
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold uppercase leading-6">
                  {paper.name}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center"
                  onClick={() =>
                    router.push(`${UrlSlugType.PAPERS}/${paper._id}`)
                  }
                >
                  <p className="text-white text-base">View Details</p>
                </button>
              </div>
              <div className="grid grid-cols-4">
                <p className="text-sm uppercase">{paper.paperId}</p>
                <div className="flex gap-2 items-center">
                  <ClockIcon
                    classes={`h-4 w-4 ${
                      paper.isTimed ? "text-blue-600" : "text-red-600"
                    }`}
                  />
                  <p
                    className={`${
                      paper.isTimed ? "text-blue-600" : "text-red-600"
                    } capitalize`}
                  >
                    {paper.isTimed
                      ? `${paper.timeInMinutes} minutes`
                      : "not timed"}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
