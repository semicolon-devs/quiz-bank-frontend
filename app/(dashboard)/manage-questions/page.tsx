"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import PaginationComponent from "@/components/pagination";
import Modal from "@/components/modal";
import EntriesPerPage from "@/components/pagination/EntriesPerPage";
import { entriesArray } from "@/components/pagination/entriesArray";

import SectionTitle from "@/components/sectionTitle";
import { table } from "@/variants/table";

import {
  EyeOpenIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

import { Question } from "@/types";

const headers = [
  "question",
  "subject",
  "subject category",
  "module",
  "difficulty",
  "actions",
];

const pageSizeArray = [5, 10, 20];

export default function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(entriesArray[1]);

  const router = useRouter();

  useEffect(() => {
    const getQuestions = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions/filter`,
        params: {
          page: pageNumber,
          limit: pageSize,
          // subject: "Biology",
          // module: "Mendelian Genetics",
        },
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestionList(response.data.result);
          setNumberOfPages(
            Math.ceil(
              response?.data?.pagination?.totalQuestions /
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

    getQuestions();
  }, [pageNumber, pageSize]);

  const deleteQuestion = (id: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}questions/${id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        toast.success("Question deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredQuestions: Question[] =
    questionList &&
    questionList.filter((item) => {
      return item.question.includes(tableSearch);
    });

  return (
    <div className="flex flex-col">
      <SectionTitle title="Manage Questions" />
      <div className={table().base()}>
        <div
          className={table().featuresRow({
            className: "grid grid-cols-4",
          })}
        >
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
          <EntriesPerPage
            value={pageSize}
            setValue={setPageSize}
            array={entriesArray}
          />
          <button
            className={table().featuresButton()}
            onClick={() => router.push(UrlSlugType.ADD_QUESTION)}
          >
            <PlusIcon classes={"w-4 h-4 text-white"} />
            <p className="">add question</p>
          </button>
        </div>
        <div
          className={table().headerRow({
            className: "grid grid-cols-7 ",
          })}
        >
          {headers.map((header) => (
            <div
              className={table().headerItem({ className: "first:col-span-2" })}
              key={header}
            >
              {header}
            </div>
          ))}
        </div>
        <div className={table().tableContent()}>
          {
            questionList &&
              filteredQuestions.map((row: Question) => {
                const regex: RegExp = /(<([^>]+)>)/gi;

                const questionToView = row.question.replace(regex, "");

                return (
                  <div
                    className={table().tableRow({
                      className: "grid grid-cols-7",
                    })}
                    key={row._id}
                  >
                    <div
                      className={table().rowItem({
                        className: "col-span-2 font-medium",
                      })}
                    >
                      {questionToView.slice(0, 40)}
                      {questionToView.length >= 40 && "..."}
                    </div>
                    <div className={table().rowItem()}>{row.subject.name}</div>
                    <div className={table().rowItem()}>
                      {row.subCategory.name}
                    </div>
                    <div className={table().rowItem()}>{row.module.name}</div>
                    <div className={table().rowItem()}>{row.difficulty}</div>
                    <div className={table().rowItem({ className: "gap-3" })}>
                      <div
                        className="p-1 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `${UrlSlugType.PREVIEW_QUESTION}/${row._id}`
                          )
                        }
                      >
                        <EyeOpenIcon classes={"w-4 h-5 text-blue-600"} />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(`${UrlSlugType.EDIT_QUESTION}/${row._id}`)
                        }
                      >
                        <EditIcon classes="h-4 w-4 text-blue-600" />
                      </div>
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
                          handleSubmit={() => deleteQuestion(row._id)}
                        >
                          <p className="">
                            Are you sure you want to delete
                            <span className="font-medium space-x-1">
                              &quot;{row.question.slice(0, 40)}
                              {row.question.length >= 40 && "..."}&quot;
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
