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
import EntriesPerPage from "@/components/pagination/EntriesPerPage";
import { entriesArray } from "@/components/pagination/entriesArray";
import SectionTitle from "@/components/sectionTitle";
import Modal from "@/components/modal";
import AddPDFPaperModal from "./modals/AddPDFPaperModal";
import EditPaperModal from "./modals/EditPaperModal";

import { table } from "@/variants/table";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

import { LMSStdDetails } from "@/types";

const headers = ["Student Name", "Email", "Passowrd", "actions"];

export default function ManageUsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<LMSStdDetails[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [modalShowPaper, setModalShowPaper] = useState<LMSStdDetails>();
  const [pageSize, setPageSize] = useState<number>(entriesArray[1]);

  const router = useRouter();

  //get studnets
  useEffect(() => {
    const getPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/studnets`,
        params: {
          page: pageNumber,
          limit: pageSize,
        },
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setStudentList(response.data.result);
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalPapers /
                response?.data?.pagination?.limit
            )
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getPapers();
  }, [pageNumber, pageSize]);

  //delete student
  const deleteStudent = (email: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}lms/students/${email}`,
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

  const filteredPapers: LMSStdDetails[] =
    studentList &&
    studentList.filter((paper) => {
      return paper.name.includes(tableSearch);
    });

  return (
    <div>
      <div className="flex justify-between">
        <SectionTitle title="Add Weekly Papers" />
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
              placeholder="Search Papers"
            />
            <div className={table().featuresSearchButton()}>
              <SearchIcon classes={"h-4 w-4 text-white"} />
            </div>
          </div>
          <EntriesPerPage
            value={pageSize}
            setValue={setPageSize}
            array={entriesArray}
          />
          <AddPDFPaperModal />
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
            studentList &&
              filteredPapers.map((row: LMSStdDetails) => {
                return (
                  <div
                    className={table().tableRow({
                      className: "grid grid-cols-6",
                    })}
                    key={row.email}
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
                      {row.email}
                    </div>
                    <div
                      className={table().rowItem({ className: "uppercase" })}
                    >
                      {row.password}
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

                      <div className="cursor-pointer">
                        <Modal
                          viewButton={
                            <DeleteIcon classes="h-4 w-4 text-red-600" />
                          }
                          modalTitle={"Alert!"}
                          submitBtn={
                            <button className="bg-red-100 hover:bg-red-200 rounded-md px-4 py-2">
                              <p className="capitalize text-red-600 font-medium">
                                delete
                              </p>
                            </button>
                          }
                          handleSubmit={() => deleteStudent(row.email)}
                        >
                          <p className="">
                            Are you sure you want to delete
                            <span className="font-medium space-x-1">
                              {" "}
                              {row.name}
                            </span>{" "}
                            from the system?
                          </p>
                        </Modal>
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
    </div>
  );
}
