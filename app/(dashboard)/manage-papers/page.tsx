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
  getKeyValue,
} from "@nextui-org/table";
import { Chip, ChipProps } from "@nextui-org/chip";
import { EditIcon, DeleteIcon, EyeOpenIcon } from "@/components/icons";

import DeleteQPaperModal from "./modals/deleteQPaperModal";
import EditQPaperModal from "./modals/editQPaperModal";
import CreateQPaperModal from "./modals/CreateQPaperModal";

import SectionTitle from "@/components/sectionTitle";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

interface QPaper {
  paperId: string;
  name: string;
  timeInMinutes: number;
  isTimed: boolean;
  paperType: string;
  questions: any[];
  _id: string;
  __v: number;
}

const columns = [
  { name: "PAPER NAME", uid: "name" },
  { name: "PAPER CODE", uid: "paperId" },
  { name: "PAPER TYPE", uid: "paperType" },
  { name: "TIMING", uid: "timing" },
  { name: "QUESTIONS", uid: "questions" },
  { name: "ACTIONS", uid: "actions" },
];

export default async function CreateQPackPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [QPaperList, setQPaperList] = useState<QPaper[]>([]);

  const router = useRouter();

  const renderCell = React.useCallback(
    (QPaper: QPaper, columnKey: React.Key) => {
      const cellValue = QPaper[columnKey as keyof QPaper];

      switch (columnKey) {
        case "name":
          return <div>{QPaper.name}</div>;
        case "paperId":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm uppercase font-semibold">
                {cellValue}
              </p>
            </div>
          );
        case "paperType":
          return <p className="">{cellValue}</p>;
        case "timing":
          return <p className="">{cellValue ? "Timed" : "Not Timed"}</p>;
        case "questions":
          return (
            <div className="relative flex items-center gap-2">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() =>
                  router.push(`/q-paper-add-questions/${QPaper._id}`)
                }
              >
                <Chip className="uppercase" color="secondary" size="sm">
                  <p className="font-semibold text-xs">manage questions</p>
                </Chip>
              </span>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => router.push(`/preview/quiz/${QPaper._id}/1`)}
              >
                <EyeOpenIcon classes="h-4 w-4" />
              </span>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditQPaperModal qPaper={QPaper} />
              </span>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteQPaperModal qPaper={QPaper} />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

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
    <div>
      <div className="flex justify-between">
        <SectionTitle title="Manage Papers" />
        <CreateQPaperModal />
      </div>
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
        <TableBody items={QPaperList}>
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
