"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip } from "@nextui-org/chip";
import { MinusIcon, EyeOpenIcon, PlusIcon } from "@/components/icons";

import { title } from "@/components/primitives";

const columns = [
  { name: "QUESTION", uid: "question" },
  { name: "SUBJECT", uid: "subject" },
  { name: "SUBJECT CATEGORY", uid: "subCategory" },
  { name: "MODULE", uid: "module" },
  { name: "DIFFICULTY LEVEL", uid: "difficulty" },
  { name: "ACTIONS", uid: "actions" },
];

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

interface QuestionRow {
  _id: string;
  question: string;
  subject: string;
  subCategory: string;
  module: string;
  difficulty: string;
}

const selectedQuestions: Question[] = [
  {
    _id: "656272a15924ffb42375caec",
    subject: {
      _id: "65546614c33fb7a51b895f28",
      name: "Biology",
      subCategories: [
        "6554665fc33fb7a51b895f30",
        "65546667c33fb7a51b895f34",
        "65578d1523b28f6d5299fb79",
      ],
      __v: 0,
    },
    subCategory: {
      _id: "6554665fc33fb7a51b895f30",
      name: "Anatomy",
      __v: 0,
      moduleList: ["65610b42a14c6efc0a94fe68"],
    },
    module: {
      _id: "65610b42a14c6efc0a94fe68",
      name: "Human Anatomy",
      __v: 0,
    },
    difficulty: "Medium",
    type: "MCQ",
    question: "<p>Question updated</p>",
    answers: [
      {
        number: 1,
        answer: "<p>a1</p>",
        _id: "657560e1ce71e57992639451",
      },
      {
        number: 2,
        answer: "<p>a2</p>",
        _id: "657560e1ce71e57992639452",
      },
      {
        number: 3,
        answer: "<p>a3</p>",
        _id: "657560e1ce71e57992639453",
      },
      {
        number: 4,
        answer: "<p>a4</p>",
        _id: "657560e1ce71e57992639454",
      },
      {
        number: 5,
        answer: "<p>a5</p>",
        _id: "657560e1ce71e57992639455",
      },
    ],
    correctAnswer: [0, 2],
    explaination: "<p>explanation</p>",
    __v: 0,
  },
];

const allQuestions: Question[] = [
  {
    _id: "656272a15924ffb42375caec",
    subject: {
      _id: "65546614c33fb7a51b895f28",
      name: "Physics",
      subCategories: [
        "6554665fc33fb7a51b895f30",
        "65546667c33fb7a51b895f34",
        "65578d1523b28f6d5299fb79",
      ],
      __v: 0,
    },
    subCategory: {
      _id: "6554665fc33fb7a51b895f30",
      name: "Nuclear Physics",
      __v: 0,
      moduleList: ["65610b42a14c6efc0a94fe68"],
    },
    module: {
      _id: "65610b42a14c6efc0a94fe68",
      name: "Sustainable Nuclear Phyisics",
      __v: 0,
    },
    difficulty: "Hard",
    type: "MCQ",
    question:
      "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>",
    answers: [
      {
        number: 1,
        answer: "<p>a1</p>",
        _id: "657560e1ce71e57992639451",
      },
      {
        number: 2,
        answer: "<p>a2</p>",
        _id: "657560e1ce71e57992639452",
      },
      {
        number: 3,
        answer: "<p>a3</p>",
        _id: "657560e1ce71e57992639453",
      },
      {
        number: 4,
        answer: "<p>a4</p>",
        _id: "657560e1ce71e57992639454",
      },
      {
        number: 5,
        answer: "<p>a5</p>",
        _id: "657560e1ce71e57992639455",
      },
    ],
    correctAnswer: [0, 2],
    explaination: "<p>explanation</p>",
    __v: 0,
  },
];

export default function CreateQPackPage({
  params,
}: {
  params: { qpaper: string };
}) {
  const [selectedQuestionRow, setSelectedQuestionRow] = useState<QuestionRow[]>(
    []
  );
  const [allQuestionRow, setAllQuestionRow] = useState<QuestionRow[]>([]);

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

    setSelectedQuestionRow(extractQuestionRows(selectedQuestions));
    setAllQuestionRow(extractQuestionRows(allQuestions));
  }, []);

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
                <span className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2">
                  <EyeOpenIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">preview</p>
                </span>
              </Chip>
              <Chip size="sm" color="danger">
                <span className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2">
                  <MinusIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">remove</p>
                </span>
              </Chip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
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
                <span className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2">
                  <EyeOpenIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">preview</p>
                </span>
              </Chip>
              <Chip size="sm" color="primary">
                <span className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2">
                  <PlusIcon classes="h-3 w-3" />
                  <p className="text-sm uppercase font-semibold">add</p>
                </span>
              </Chip>
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
      <h1 className={title({ size: "md" })}>
        Add questions to Q Paper {params.qpaper}
      </h1>
      <p className="mt-5">added questions</p>
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
                <TableCell>{renderSelectedQuestionsCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="mt-5">all questions</p>
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
                <TableCell>{renderAllQuestionsCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}