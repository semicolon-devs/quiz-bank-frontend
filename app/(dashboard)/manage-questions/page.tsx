"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import EditQuestionModal from "./modals/editQuestionModal";
import PaginationComponent from "@/components/pagination";
import Modal from "@/components/modal";

import { table } from "@/variants/table";

import {
  EyeOpenIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";

import SectionTitle from "@/components/sectionTitle";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

interface Question {
  answers: any[];
  correctAnswer: number[];
  difficulty: string;
  explaination: string;
  module: { _id: string; name: string; __v: number };
  question: string;
  subCategory: { _id: string; name: string; __v: number; moduleList: any[] };
  subject: { _id: string; name: string; subCategories: any[]; __v: number };
  type: string;
  __v: number;
  _id: string;
}

const headers = [
  "question",
  "subject",
  "subject category",
  "module",
  "difficulty",
  "actions",
];

export default function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");

  const page_size = 10;

  const router = useRouter();

  useEffect(() => {
    const getQuestions = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
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

    getQuestions();
  }, []);

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
                    <div className={table().rowItem({ className: "gap-2" })}>
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
                      <div className="">
                        <EditIcon classes="h-4 w-4 text-blue-600" />
                        {/* <Modal viewButton={undefined} modalTitle={""} children={undefined}/> */}
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
                                "{row.question.slice(0, 40)}
                                {row.question.length >= 40 && "..."}"
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
                          handleSubmit={() => deleteQuestion(row._id)}
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
    </div>
  );
}
