"use client";

import { useState, useEffect } from "react";
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

import { title } from "@/components/primitives";
import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

const columns = [
  {
    key: "question",
    label: "QUESTION",
  },
  {
    key: "subject",
    label: "SUBJECT",
  },
  {
    key: "subCategory",
    label: "SUBJECT CATEGORY",
  },
  {
    key: "difficulty",
    label: "DIFFICULTY",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

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

export default function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionRow, setQuestionRow] = useState<QuestionRow[]>([]);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    setQuestionRow(extractQuestionRows(questions));
  }, [questions]);

  const getQuestions = async () => {
    setLoading(true);
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}questions`,
    };
    axios(axiosConfig)
      .then((response) => {
        setQuestions(response.data);
        getAccess();
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

  return (
    <div>
      <h1 className={title({ size: "md" })}>Manage Questions</h1>
      <Table aria-label="Example table with dynamic content" className="mt-5">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={questionRow}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
