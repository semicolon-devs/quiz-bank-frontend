"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import SectionTitle from "@/components/sectionTitle";
import SectionSubTitle from "@/components/sectionSubTitle";

import { table } from "@/variants/table";

import { RightArrowWithTailIcon, RightArrowIcon } from "@/components/icons";

import { getAccess } from "@/helpers/token";
import { BASE_URL } from "@/config/apiConfig";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

const rows = [
  {
    key: "1",
    quiz_no: "45756",
    quiz_name: "Bio Chemistry quiz",
    score: "-",
    questions_completed: "10/12",
    status: "in progress",
  },
  {
    key: "2",
    quiz_no: "35687",
    quiz_name: "Calculus quiz",
    score: "75/100",
    questions_completed: "12/12",
    status: "completed",
  },
  {
    key: "3",
    quiz_no: "23456",
    quiz_name: "Genetics quiz",
    score: "99/100",
    questions_completed: "12/12",
    status: "completed",
  },
  {
    key: "4",
    quiz_no: "45756",
    quiz_name: "Bio Chemistry quiz",
    score: "-",
    questions_completed: "10/12",
    status: "in progress",
  },
  {
    key: "5",
    quiz_no: "35687",
    quiz_name: "Calculus quiz",
    score: "75/100",
    questions_completed: "12/12",
    status: "completed",
  },
  {
    key: "6",
    quiz_no: "23456",
    quiz_name: "Genetics quiz",
    score: "99/100",
    questions_completed: "12/12",
    status: "completed",
  },
];

const headers = [
  "QUIZ NO",
  "QUIZ NAME",
  "SCORE",
  "QUESTIONS COMPLETED",
  "STATUS",
];

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

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
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
    <>
      <SectionTitle title={"Student Dashboard"} />
      <div className="mb-4 max-w-full">
        <div className="flex justify-between items-center">
          <SectionSubTitle title={"Papers"} />
          <div
            className="flex gap-2 transition duration-700 items-center cursor-pointer"
            onClick={() => router.push(UrlSlugType.PAPERS)}
          >
            <p className="text-blue-600 text-sm font-medium">View all</p>
            <RightArrowIcon classes={"w-2.5 h-2.5 text-blue-600"} />
          </div>
        </div>
        <div className="w-full grid grid-cols-5 gap-3">
          {paperList &&
            paperList.slice(0, 5).map((paper) => (
              <div
                className="bg-white rounded-xl overflow-hidden shadow w-full p-2 flex flex-col justify-between h-40"
                key={paper._id}
              >
                <div className="flex flex-col">
                  <p className="text-sm uppercase">{paper.paperId}</p>
                  <p className="text-xl font-semibold uppercase leading-6">
                    {paper.name}
                  </p>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 hover:gap-3 transition duration-1000 rounded-lg px-2 py-1 w-full flex gap-2 items-center justify-center"
                  onClick={() =>
                    router.push(`${UrlSlugType.PAPERS}/${paper._id}`)
                  }
                >
                  <p className="text-white text-sm">View Details</p>
                  <RightArrowWithTailIcon classes="h-5 w-5 text-white" />
                </button>
              </div>
            ))}
        </div>
      </div>
      <SectionSubTitle title="Stats" />
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          <div className=" bg-white rounded-xl p-3 shadow flex justify-between">
            <p className="font-semibold uppercase">quizes completed</p>
            <p className="font-bold uppercase">14</p>
          </div>
          <div className=" bg-white rounded-xl p-3 shadow flex justify-between">
            <p className="font-semibold uppercase">quizes in progress</p>
            <p className="font-bold uppercase">2</p>
          </div>
          <div className=" bg-white rounded-xl p-3 shadow flex justify-between">
            <p className="font-semibold uppercase">average score</p>
            <p className="font-bold uppercase">89/100</p>
          </div>
          <div className=" bg-white rounded-xl p-3 shadow flex justify-between">
            <p className="font-semibold uppercase">aggregated points</p>
            <p className="font-bold uppercase">1450</p>
          </div>
        </div>
        <div className="col-span-2">
          <div className={table().base()}>
            <div
              className={table().headerRow({ className: "grid grid-cols-5" })}
            >
              {headers.map((header) => (
                <div
                  className={table().headerItem({ className: "text-sm" })}
                  key={header}
                >
                  {header}
                </div>
              ))}
            </div>
            <div className={table().tableContent()}>
              {rows.map((item) => (
                <div
                  className={table().tableRow({
                    className: "grid grid-cols-5",
                  })}
                  key={item.key}
                >
                  <div className={table().rowItem()}>{item.quiz_no}</div>
                  <div className={table().rowItem()}>{item.quiz_name}</div>
                  <div className={table().rowItem()}>{item.score}</div>
                  <div className={table().rowItem()}>
                    {item.questions_completed}
                  </div>
                  <div className={table().rowItem()}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
