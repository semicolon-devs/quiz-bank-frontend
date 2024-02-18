"use client";
import { useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import EditQuestionModal from "./modals/editQuestionModal";
import PaginationComponent from "@/components/pagination";
import Modal from "@/components/modal";

import { table } from "@/variants/table";

import { EyeOpenIcon, EditIcon, DeleteIcon } from "@/components/icons";

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

interface QuestionRow {
  _id: string;
  question: string;
  subject: string;
  subCategory: string;
  module: string;
  difficulty: string;
}

const headers = [
  "question",
  "subject",
  "subject category",
  "module",
  "difficulty",
  "actions",
];

export default async function ManageQuestionsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [questionRow, setQuestionRow] = useState<QuestionRow[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

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
        toast.success("Question deleted successfully")
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

    setQuestionRow(extractQuestionRows(questionList));
  }, [questionList]);

  return (
    <div className="flex flex-col">
      <SectionTitle title="Manage Questions" />
      <div className={table().base()}>
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
            questionRow.map((row: QuestionRow) => {
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
                    {row.question.slice(0, 40)}
                    {row.question.length >= 40 && "..."}
                  </div>
                  <div className={table().rowItem()}>{row.subject}</div>
                  <div className={table().rowItem()}>{row.subCategory}</div>
                  <div className={table().rowItem()}>{row.module}</div>
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
