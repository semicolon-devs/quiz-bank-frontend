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
  title: string;
  fileId: string;
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
        url: `${BASE_URL}lms/papers`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          // console.log(response.data);
          setPaperList(response.data);
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQPapers();
  }, []);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const generateDirectLink = (fileId: string) => {
    // Assuming there's a function or API call to generate direct link using fileId
    // Replace this with your actual implementation
    return `https://drive.google.com/uc?id=${fileId}`;
  };

  return (
    <div className="p-5">
      <SectionTitle title="Download Model Papers as PDF" />

      <div className="w-full grid grid-cols-3 gap-4 p-10">
        {paperList &&
          paperList.map((paper) => (
            <div className="flex" key={paper._id}>
              <div
                className="bg-white rounded-xl overflow-hidden shadow w-full p-4 flex flex-col justify-between p-5"
                
              >
                <div className=" items-center justify-between">
                  <p className="text-xl font-semibold leading-6  py-3">
                    {paper.title}
                  </p>
                  <button
                    className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center"
                    onClick={() =>
                      openInNewTab(generateDirectLink(paper.fileId))
                    }
                  >
                    <p className="text-white text-base">Download</p>
                  </button>
                </div>
                
              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
}
