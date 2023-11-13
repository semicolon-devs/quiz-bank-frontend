"use client";

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

const rows = [
  {
    key: "1",
    question: "Question 01",
    subject: "Biology",
    subject_category: "Anatomy",
    difficulty_level: "easy",
  },
  {
    key: "2",
    question: "Question 02",
    subject: "Chemistry",
    subject_category: "Organic Chemistry",
    difficulty_level: "medium",
  },
];

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
    key: "subject_category",
    label: "SUBJECT CATEGORY",
  },
  {
    key: "difficulty_level",
    label: "DIFFICULTY LEVEL",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

export default function ManageQuestionsPage() {
  return (
    <div>
      <h1 className={title()}>Manage Questions</h1>
      <Table aria-label="Example table with dynamic content" className="mt-5">
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
  );
}
