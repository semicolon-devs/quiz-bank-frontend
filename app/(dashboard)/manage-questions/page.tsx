"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import EditQuestionModal from "./modals/editQuestionModal";
import DeleteQuestionModal from "./modals/deleteQuestionModal";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

import { EyeOpenIcon, EditIcon, DeleteIcon } from "@/components/icons";

import SectionTitle from "@/components/sectionTitle";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

interface Question {
  answers: any[];
  correctAnswer: number[];
  difficulty: string;
  explaination: string;
  module: { _id: string; name: string; __v: number };
  question: string;
  subCategory: { _id: string; name: string; __v: number; moduleList: any[] };
  subject: { _id: string; name: string; subCategories: any[]; __v: number };
  type: string;
  __v: number;
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

const columns = [
  { name: "QUESTION", uid: "question" },
  { name: "SUBJECT", uid: "subject" },
  { name: "SUBJECT CATEGORY", uid: "subCategory" },
  { name: "MODULE", uid: "module" },
  { name: "DIFFICULTY LEVEL", uid: "difficulty" },
  { name: "ACTIONS", uid: "actions" },
];

export default async function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [questionRow, setQuestionRow] = useState<QuestionRow[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getQuestions = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestionList(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQuestions();
  }, []);

  useEffect(() => {
    const regex: RegExp = /(<([^>]+)>)/gi;

    const extractQuestionRows = (questions: Question[]): QuestionRow[] => {
      return questions.map(
        ({ _id, question, difficulty, subject, subCategory, module }) => ({
          _id,
          question: question.replace(regex, ""),
          difficulty,
          module: module.name,
          subject: subject.name,
          subCategory: subCategory.name,
        })
      );
    };

    setQuestionRow(extractQuestionRows(questionList));
  }, [questionList]);

  const renderCell = useCallback(
    (question: QuestionRow, columnKey: React.Key) => {
      const cellValue = question[columnKey as keyof QuestionRow];

      switch (columnKey) {
        case "question":
          return <div className="">{cellValue}</div>;
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
              <span
                className="text-lg text-blue cursor-pointer active:opacity-50"
                onClick={() => router.push(`/preview/question/${question._id}`)}
              >
                <EyeOpenIcon classes="w-4 h-4" />
              </span>
              <span className="text-lg text-blue cursor-pointer active:opacity-50">
                <EditQuestionModal questionId={question._id} />
              </span>
              <span className="text-lg text-red cursor-pointer active:opacity-50">
                <DeleteQuestionModal question={question} />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  return (
    <div>
      <SectionTitle title="Manage Questions" />
      <Table aria-label="Example table with custom cells" className="mt-5">
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
        <TableBody items={questionRow}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
