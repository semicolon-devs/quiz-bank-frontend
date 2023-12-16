"use client";

import { title } from "@/components/primitives";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Chip, ChipProps } from "@nextui-org/chip";
// import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeOpenIcon } from "@/components/icons";

interface QPaper {
  name: string;
  paperId: string;
  timeInMinutes: number;
  paperType: string;
  questions: any[];
  _id: string;
  __v: number;
}

const columns = [
  { name: "PAPER NAME", uid: "name" },
  { name: "PAPER CODE", uid: "paperId" },
  { name: "PAPER TYPE", uid: "paperType" },
  { name: "ACTIONS", uid: "actions" },
];

const QPapers = [
  {
    name: "Physics Practise Paper",
    paperId: "phy001",
    timeInMinutes: 60,
    paperType: "NOT_TIMED",
    questions: [],
    _id: "657d4412fd0b7320f6055cde",
    __v: 0,
  },
];

export default function CreateQPackPage() {
  const renderCell = React.useCallback(
    (QPapers: QPaper, columnKey: React.Key) => {
      const cellValue = QPapers[columnKey as keyof QPaper];

      switch (columnKey) {
        case "name":
          return <div>{QPapers.name}</div>;
        case "paperId":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm uppercase font-semibold">{cellValue}</p>
            </div>
          );
        case "paperType":
          return (
            <Chip
              className="capitalize"
              color="primary"
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeOpenIcon classes="h-5 w-5" />
              </span>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon classes="h-5 w-5" />
              </span>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon classes="h-5 w-5" />
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
      <h1 className={title({ size: "md" })}>Manage Q Papers</h1>
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
        <TableBody items={QPapers}>
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
