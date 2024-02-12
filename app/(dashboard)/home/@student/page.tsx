"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

import SectionTitle from "@/components/sectionTitle";
import SectionSubTitle from "@/components/sectionSubTitle";

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

const columns = [
  {
    key: "quiz_no",
    label: "QUIZ NO",
  },
  {
    key: "quiz_name",
    label: "QUIZ NAME",
  },
  {
    key: "score",
    label: "SCORE",
  },
  {
    key: "questions_completed",
    label: "QUESTIONS COMPLETED",
  },
  {
    key: "status",
    label: "STATUS",
  },
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

export default function DashboardHomePage() {
  const [loading, setLoading] = useState<boolean>(false);
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
        <div className="w-full grid grid-cols-4 gap-5">
          {qPaperList &&
            qPaperList.slice(0, 4).map((qpaper) => (
              <div
                className="bg-white rounded-xl overflow-hidden shadow-lg w-full p-2 flex flex-col justify-between h-40"
                key={qpaper._id}
              >
                <div className="flex flex-col">
                  <p className="text-sm uppercase">{qpaper.paperId}</p>
                  <p className="text-xl font-semibold uppercase leading-6">
                    {qpaper.name}
                  </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 hover:gap-3 transition duration-1000 rounded-lg px-2 py-1 w-full flex gap-2 items-center justify-center">
                  <p className="text-white text-sm">Take Quiz</p>
                  <RightArrowWithTailIcon classes="h-5 w-5 text-white" />
                </button>
              </div>
            ))}
        </div>
      </div>
      <SectionSubTitle title="Stats" />
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-3">
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">quizes completed</p>
                <p className="font-bold uppercase">14</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">quizes in progress</p>
                <p className="font-bold uppercase">2</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">average score</p>
                <p className="font-bold uppercase">89/100</p>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between">
                <p className="font-semibold uppercase">aggregated points</p>
                <p className="font-bold uppercase">1450</p>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-2">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
