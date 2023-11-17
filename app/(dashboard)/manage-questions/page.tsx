"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

import { EyeIcon, EditIcon, DeleteIcon } from "@/components/icons";

import { title } from "@/components/primitives";
import { BASE_URL } from "@/config/apiConfig";

interface Question {
  answers: any[];
  correctAnswer: number[];
  explaination: string;
  question: string;
  subCategory: {
    name: string;
    __v: number;
    _id: string;
  };
  subject: { _id: string; name: string; subCategories: string[]; __v: number };
  type: string;
  __v: number;
  _id: string;
  difficulty: string;
}

interface QuestionRow {
  _id: string;
  question: string;
  subject: string;
  subCategory: string;
  difficulty: string;
}

const columns = [
  { name: "QUESTION", uid: "question" },
  { name: "SUBJECT", uid: "subject" },
  { name: "SUBJECT CATEGORY", uid: "subCategory" },
  { name: "DIFFICULTY LEVEL", uid: "difficulty" },
  { name: "ACTIONS", uid: "actions" },
];

export default function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [questionRow, setQuestionRow] = useState<QuestionRow[]>([]);

  const router = useRouter();

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    setQuestionRow(extractQuestionRows(questionList));
  }, [questionList]);

  const getQuestions = () => {
    setLoading(true);
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}questions`,
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

  const regex: RegExp = /(<([^>]+)>)/gi;

  const extractQuestionRows = (questions: Question[]): QuestionRow[] => {
    return questions.map(
      ({ _id, question, difficulty, subject, subCategory }) => ({
        _id,
        question: question.replace(regex, ""),
        difficulty,
        subject: subject.name,
        subCategory: subCategory.name,
      })
    );
  };

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
                onClick={() => router.push(`/preview/${question._id}`)}
              >
                <EyeIcon classes="w-4 h-4" />
              </span>
              <span className="text-lg text-blue cursor-pointer active:opacity-50">
                <EditIcon classes="w-4 h-4" />
              </span>
              <span className="text-lg text-red cursor-pointer active:opacity-50">
                <DeleteIcon classes="w-4 h-4" />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div>
      <h1 className={title({ size: "md" })}>Manage Questions</h1>
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
