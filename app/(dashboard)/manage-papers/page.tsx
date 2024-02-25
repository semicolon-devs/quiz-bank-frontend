"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  EditIcon,
  DeleteIcon,
  EyeOpenIcon,
  SearchIcon,
  PlusIcon,
} from "@/components/icons";

import PaginationComponent from "@/components/pagination";
import SectionTitle from "@/components/sectionTitle";

import Modal from "@/components/modal";
import AddPaperModal from "./modals/AddPaperModal";
import EditPaperModal from "./modals/EditPaperModal";

import { table } from "@/variants/table";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

import { PaperDetails } from "@/types";

const headers = [
  "paper name",
  "paper id",
  "paper type",
  "timing",
  "questions",
  "actions",
];

export default function ManagePapersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [paperList, setPaperList] = useState<PaperDetails[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [modalShowPaper, setModalShowPaper] = useState<PaperDetails>();

  const page_size = 10;

  const router = useRouter();

  useEffect(() => {
    const getPapers = async () => {
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
          setPaperList(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getPapers();
  }, []);

  const deletePaper = (id: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}papers/${id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredPapers: PaperDetails[] =
    paperList &&
    paperList.filter((paper) => {
      return paper.name.includes(tableSearch);
    });

  return (
    <div>
      <div className="flex justify-between">
        <SectionTitle title="Manage Papers" />
      </div>
      <div className={table().base()}>
        <div className={table().featuresRow({ className: "grid grid-cols-4" })}>
          <div
            className={table().featuresSearchDiv({ className: "col-span-2" })}
          >
            <input
              type="text"
              onChange={(e) => setTableSearch(e.target.value)}
              value={tableSearch}
              className={table().featuresSearchInput()}
              placeholder="Search questions"
            />
            <div className={table().featuresSearchButton()}>
              <SearchIcon classes={"h-4 w-4 text-white"} />
            </div>
          </div>
          <div className=""></div>

          <AddPaperModal />
        </div>
        <div
          className={table().headerRow({
            className: "grid grid-cols-6",
          })}
        >
          {headers.map((header) => (
            <div className={table().headerItem({ className: "" })} key={header}>
              {header}
            </div>
          ))}
        </div>
        <div className={table().tableContent()}>
          {
            paperList &&
              filteredPapers.map((row: PaperDetails) => {
                return (
                  <div
                    className={table().tableRow({
                      className: "grid grid-cols-6",
                    })}
                    key={row._id}
                  >
                    <div
                      className={table().rowItem({
                        className: "font-medium",
                      })}
                    >
                      {row.name}
                    </div>
                    <div
                      className={table().rowItem({ className: "uppercase" })}
                    >
                      {row.paperId}
                    </div>
                    <div className={table().rowItem()}>{row.paperType}</div>
                    <div className={table().rowItem()}>
                      {row.isTimed ? `${row.timeInMinutes} mins` : "Not timed"}
                    </div>
                    <div className={table().rowItem()}>
                      <div
                        className="bg-blue-400 px-3 py-1 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          router.push(
                            `${UrlSlugType.MANAGE_PAPER_QUESTIONS}/${row._id}`
                          )
                        }
                      >
                        <p className="text-white text-xs font-medium">
                          Manage questions
                        </p>
                      </div>
                    </div>
                    <div className={table().rowItem({ className: "gap-3" })}>
                      {/* <div
                        className="p-1 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `${UrlSlugType.PREVIEW_QUESTION}/${row._id}`
                          )
                        }
                      >
                        <EyeOpenIcon classes={"w-4 h-5 text-blue-600"} />
                      </div> */}
                      <div className="" onClick={() => setModalShowPaper(row)}>
                        <EditPaperModal
                          paper={modalShowPaper && modalShowPaper}
                        />
                      </div>
                      <div className="cursor-pointer">
                        <Modal
                          viewButton={
                            <DeleteIcon classes="h-4 w-4 text-red-600" />
                          }
                          modalTitle={"Alert!"}
                          children={
                            <p className="">
                              Are you sure you want to delete
                              <span className="font-medium space-x-1">
                                {" "}
                                {row.name}
                              </span>{" "}
                              from the system?
                            </p>
                          }
                          submitBtn={
                            <button className="bg-red-100 hover:bg-red-200 rounded-md px-4 py-2">
                              <p className="capitalize text-red-600 font-medium">
                                delete
                              </p>
                            </button>
                          }
                          handleSubmit={() => deletePaper(row._id)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            // ) : (
            //   <div className="w-full h-96 flex items-center justify-center">
            //     <div className="flex items-center flex-col max-w-[641px]">
            //       <div className="h-12 w-12 flex items-center justify-center bg-primary-1-50 rounded-xl">
            //         <MenuIcon
            //           className="fill-primary-1-500"
            //           width={"30px"}
            //           height={"30px"}
            //           viewBox="0 0 20 20"
            //         />
            //       </div>
            //       <p className="text-gray-primary text-3.3xl font-medium">
            //         {myOrdersType == "upcoming"
            //           ? "No upcoming orders!"
            //           : "No past orders!"}
            //       </p>
            //       <p className="text-gray-tertiary">
            //         Lorem ipsum dolor sit amet consectetur. Placerat urna volutpat
            //         risus elit sit tempus nunc. Ut in nam tempus quam volutpat.
            //         Blandit purus lorem laoreet eleifend eu dui sit faucibu
            //       </p>
            //     </div>
            //   </div>
            // )}
          }
        </div>
        <div className={table().paginationDiv()}>
          <PaginationComponent
            numberOfPages={numberOfPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
      {/* <Table aria-label="Example table with custom cells" className="mt-5">
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
      </Table> */}
    </div>
  );
}
