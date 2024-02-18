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
  const [qPaperList, setQPaperList] = useState<QPaper[]>();

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
          setQPaperList(response.data);
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
      <SectionTitle title="papers" />
      <div className="w-full flex flex-col gap-3">
        {qPaperList &&
          qPaperList.map((qpaper) => (
            <div
              className="bg-white rounded-xl overflow-hidden shadow-lg w-full p-4 flex flex-col justify-between"
              key={qpaper._id}
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold uppercase leading-6">
                  {qpaper.name}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center"
                  onClick={() =>
                    router.push(`${UrlSlugType.PAPERS}/${qpaper._id}`)
                  }
                >
                  <p className="text-white text-base">View Details</p>
                </button>
              </div>
              <div className="grid grid-cols-4">
                <p className="text-sm uppercase">{qpaper.paperId}</p>
                <div className="flex gap-2 items-center">
                  <ClockIcon
                    classes={`h-4 w-4 ${
                      qpaper.isTimed ? "text-blue-600" : "text-red-600"
                    }`}
                  />
                  <p
                    className={`${
                      qpaper.isTimed ? "text-blue-600" : "text-red-600"
                    } capitalize`}
                  >
                    {qpaper.isTimed
                      ? `${qpaper.timeInMinutes} minutes`
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
