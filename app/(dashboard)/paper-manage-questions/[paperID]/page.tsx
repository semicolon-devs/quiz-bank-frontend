"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";
import { MinusIcon, EyeOpenIcon, PlusIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import SectionTitle from "@/components/sectionTitle";
// import AddQuestionModal from "./modals/addQuestionModal";
// import RemoveQuestionModal from "./modals/removeQuestionModal";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

const columns = [
  { name: "QUESTION", uid: "question" },
  { name: "SUBJECT", uid: "subject" },
  { name: "SUBJECT CATEGORY", uid: "subCategory" },
  { name: "MODULE", uid: "module" },
  { name: "DIFFICULTY LEVEL", uid: "difficulty" },
  { name: "ACTIONS", uid: "actions" },
];

interface QPaper {
  paperId: string;
  name: string;
  timeInMinutes: number;
  isTimed: boolean;
  paperType: string;
  questions: Question[];
  _id: string;
  __v: number;
}

interface Question {
  _id: string;
  subject: any;
  subCategory: any;
  module: any;
  difficulty: string;
  type: string;
  question: string;
  answers: any[];
  correctAnswer: number[];
  explaination: string;
  __v: number;
}

interface SimplifiedQuestion {
  difficulty: string;
  module: { name: string };
  question: string;
  subCategory: { name: string };
  subject: { name: string };
  type: string;
  _id: string;
}

interface QuestionRow {
  _id: string;
  question: string;
  subject: string;
  subCategory: string;
  module: string;
  difficulty: string;
}

export default async function CreateQPackPage({
  params,
}: {
  params: { qpaper: string };
}) {
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [qPaperLoading, setQPaperLoading] = useState<boolean>(false);
  const [allQuestionList, setAllQuestionList] = useState<SimplifiedQuestion[]>(
    []
  );
  const [selectedQuestionRow, setSelectedQuestionRow] = useState<QuestionRow[]>(
    []
  );
  const [allQuestionRow, setAllQuestionRow] = useState<QuestionRow[]>([]);
  const [qPaper, setQPaper] = useState<QPaper>();
  const [qPaperError, setQPaperError] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      setQuestionsLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setAllQuestionList(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setQuestionsLoading(false);
        });
    };

    getQuestions();
  }, []);

  useEffect(() => {
    const getQPaper = () => {
      setQPaperError(false);
      setQPaperLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/admin/${params.qpaper}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQPaper(response.data);
        })
        .catch((err) => {
          setQPaperError(true);
          console.log(err);
        })
        .finally(() => {
          setQPaperLoading(false);
        });
    };

    getQPaper();
  }, [params.qpaper]);

  useEffect(() => {
    const regex: RegExp = /(<([^>]+)>)/gi;

    const extractAllQuestionRows = (
      questions: SimplifiedQuestion[]
    ): QuestionRow[] => {
      return questions.map(
        ({ _id, question, difficulty, subject, subCategory, module }) => ({
          _id,
          question: question && question.replace(regex, ""),
          difficulty,
          module: module.name,
          subject: subject.name,
          subCategory: subCategory.name,
        })
      );
    };

    const extractQuestionRows = (
      questions: SimplifiedQuestion[]
    ): QuestionRow[] => {
      return questions.map(
        ({ _id, question, difficulty, subject, subCategory, module }) => ({
          _id,
          question: question && question.replace(regex, ""),
          difficulty,
          module: module.name,
          subject: subject.name,
          subCategory: subCategory.name,
        })
      );
    };

    qPaper && setSelectedQuestionRow(extractQuestionRows(qPaper.questions));
    setAllQuestionRow(
      extractAllQuestionRows(
        allQuestionList.filter(
          (obj1) =>
            qPaper && !qPaper.questions.some((obj2) => obj2._id === obj1._id)
        )
      )
    );
  }, [allQuestionList, qPaper]);

  const renderSelectedQuestionsCell = React.useCallback(
    (question: QuestionRow, columnKey: React.Key) => {
      const cellValue = question[columnKey as keyof QuestionRow];

      switch (columnKey) {
        case "question":
          return <div>{cellValue}</div>;
        case "subject":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "subCategory":
          return <div className="">{cellValue}</div>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Chip size="sm" color="secondary">
                <span
                  className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2"
                  onClick={() =>
                    router.push(
                      `${UrlSlugType.PREVIEW_QUESTION}/${question._id}`
                    )
                  }
                >
                  <EyeOpenIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">preview</p>
                </span>
              </Chip>
              <Chip size="sm" color="danger">
                <RemoveQuestionModal qPaper={qPaper} question={question} />
              </Chip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [qPaper]
  );

  const renderAllQuestionsCell = React.useCallback(
    (question: QuestionRow, columnKey: React.Key) => {
      const cellValue = question[columnKey as keyof QuestionRow];

      switch (columnKey) {
        case "question":
          return <div>{cellValue}</div>;
        case "subject":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "subCategory":
          return <div className="">{cellValue}</div>;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Chip size="sm" color="secondary">
                <span
                  className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2"
                  onClick={() =>
                    router.push(`${UrlSlugType.PREVIEW_QUESTION}/${question._id}`)
                  }
                >
                  <EyeOpenIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">preview</p>
                </span>
              </Chip>
              <Chip size="sm" color="primary">
                <AddQuestionModal question={question} qPaper={qPaper} />
              </Chip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [qPaper]
  );

  return (
    <div>
      {qPaperError ? (
        <div className="w-full">
          <p className="text-xl capitalize text-center">
            This Q Paper does not exist
          </p>
        </div>
      ) : (
        <>
          <SectionTitle
            title={qPaper?.name ? qPaper?.name : "Paper Loading..."}
          />
          {/* <h1 className={`${title({ size: "md" })} uppercase`}>
            {qPaper ? qPaper.paperId : "Paper loading ..."} :{" "}
            {qPaper && qPaper.name}
          </h1> */}
          <p className="mt-5 font-semibold capitalize text-lg">
            added questions
          </p>
          {qPaperLoading ? (
            <div className="w-full flex justify-center items-center my-5">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table aria-label="Added Questions" className="mt-5">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={selectedQuestionRow}>
                {(item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderSelectedQuestionsCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          <p className="mt-5 font-semibold capitalize text-lg">all questions</p>
          {questionsLoading ? (
            <div className="w-full flex justify-center items-center my-5">
              <Spinner color="primary" />
            </div>
          ) : (
            <Table aria-label="All Questions" className="mt-5">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={allQuestionRow}>
                {(item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>
                        {renderAllQuestionsCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </>
      )}
    </div>
  );
}
