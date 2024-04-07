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
        url: `${BASE_URL}lms/pdf-papers`,
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


  const openInNewTab = (url :string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div>
      <SectionTitle title="Download Papers as PDF" backBtn />
      <div className="w-1/2 flex flex-col gap-3 p-10">
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
                  onClick={() => openInNewTab('https://stackoverflow.com')}

                >
                  <p className="text-white text-base">Download</p>
                </button>
              </div>
              
              
            </div>
          ))}
      </div>
    </div>
  );
}
