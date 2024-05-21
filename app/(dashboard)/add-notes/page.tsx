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
import AddNoteModal from "./modals/AddNoteModal";
import EditPaperModal from "./modals/EditPaperModal";

import { table } from "@/variants/table";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { PaperType } from "@/utils/enums";

import { NoteDetails } from "@/types";

const headers = ["Note Name", "Subject", "Link", "actions"];

export default function ManageUsersPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [papersList, setpapersList] = useState<NoteDetails[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [modalShowPaper, setModalShowPaper] = useState<NoteDetails>();
  const [pageSize, setPageSize] = useState<number>(entriesArray[1]);
  const [paperAdded, setPaperAdded] = useState<boolean>(false);
  const [deleteNoteV, setdeleteNote] = useState<boolean>(false);

  const router = useRouter();

  const formatSubjectLabel = (subject: string) => {
    switch (subject) {
      case "reading_skills":
        return "Reading Skills";
      case "general_knowledge":
        return "General Knowledge";
      case "logical_reasoning":
        return "Logical Reasoning";
      case "problem_solving":
        return "Problem Solving";
      case "biology":
        return "Biology";
      case "chemistry":
        return "Chemistry";
      case "physics":
        return "Physics";
      case "maths":
        return "Maths";
      case "not_specified":
        return "Not Specified"; // Added case for new subject
      default:
        return "Not Specified";
    }
  }

  const paperAddedFunc = () => {
    setPaperAdded(true);
    // console.log("user added called");
  };

  //get papers
  useEffect(() => {
    const getPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/notes`,
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
          // console.log(response.data);
          setpapersList(response.data);
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalPapers /
                response?.data?.pagination?.limit
            )
          );
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
          setPaperAdded(false);
          setdeleteNote(false);
        });
    };

    getPapers();
  }, [pageNumber, pageSize, paperAdded, deleteNoteV]);

  //delete student
  const deleteNote = (_id: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}lms/notes/${_id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setdeleteNote(true);
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setdeleteNote(true);
      });
  };

  const filteredPapers: NoteDetails[] =
    papersList &&
    papersList.filter((paper) => {
      return paper.title.includes(tableSearch);
    });

  const generateDirectLink = (fileId: string) => {
    return `https://drive.google.com/uc?id=${fileId}`;
  };

  const getFileIdFromGoogleDriveUrl = (url: string) => {
    const regex: RegExp =
      /(?:https?:\/\/)?(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:.*\/)?d\/)([\w-]{25,})/;

    // Attempt to match the URL with the regular expression
    const match: RegExpMatchArray | null = url.match(regex);

    if (match) {
      // Return the file ID captured in the first capture group
      return match[1];
    } else {
      // Handle invalid or unrecognized URLs
      return null;
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <SectionTitle title="Add Notes" />
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
              placeholder="Search Notes"
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
          <AddNoteModal added={paperAddedFunc} />
        </div>
        <div
          className={table().headerRow({
            className: "grid grid-cols-4",
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
            papersList &&
              filteredPapers.map((row: NoteDetails) => {
                return (
                  <div
                    className={table().tableRow({
                      className: "grid grid-cols-4",
                    })}
                    key={row._id}
                  >
                    <div
                      className={table().rowItem({
                        className: "font-medium",
                      })}
                    >
                      {row.title}
                    </div>

                    <div
                      className={table().rowItem({
                        className: "font-medium",
                      })}
                    >
                      {formatSubjectLabel(row.subject)}
                    </div>

                    <div className={table().rowItem({ className: "p-2" })}>
                      <button className="bg-green-100 hover:bg-green-200 rounded-md px-4 py-1">
                        <a
                          href={generateDirectLink(row.fileId)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          File Download Link
                        </a>
                      </button>
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
                          handleSubmit={() => deleteNote(row._id)}
                        >
                          <p className="">
                            Are you sure you want to delete
                            <span className="font-medium space-x-1">
                              {" "}
                              {row.title}
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
