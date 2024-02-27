"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Reorder } from "framer-motion";

import Modal from "@/components/modal";
import PaginationComponent from "@/components/pagination";
import EntriesPerPage from "@/components/pagination/EntriesPerPage";
import SectionSubTitle from "@/components/sectionSubTitle";
import SectionTitle from "@/components/sectionTitle";
import { table } from "@/variants/table";

import {
  MinusIcon,
  PlusIcon,
  SearchIcon,
  CloseIcon,
  InfoIcon,
} from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { Paper } from "@/types";

import { Question } from "@/types";
import toast from "react-hot-toast";

const allQuestionsHeaders = [
  "question",
  "subject",
  "subject category",
  "module",
  "difficulty",
  "actions",
];

const selectedQuestionsHeaders = [
  "question no",
  "question",
  "module",
  "difficulty",
  "actions",
];

const pageSizeArray = [5, 10, 20];

type Props = {};

const ManagePaperQuestionsPage = ({
  params,
}: {
  params: { paperID: string };
}) => {
  const [paper, setPaper] = useState<Paper>();
  const [loading, setLoading] = useState<boolean>(false);
  const [allQuestionsList, setAllQuestionsList] = useState<Question[]>([]);
  const [selectedQuestionsList, setSelectedQuestionsList] = useState<
    Question[]
  >([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [tableSearch, setTableSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(pageSizeArray[0]);

  const router = useRouter();

  useEffect(() => {
    const getPaper = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers/admin/${params.paperID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPaper(response.data);
          setSelectedQuestionsList(response.data.questions);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    };

    getPaper();
  }, [params.paperID]);

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
          setAllQuestionsList(response.data.result);
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

  const removeQuestion = (questionID: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}papers/${params.paperID}/${questionID}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addQuestion = (questionID: string) => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}papers/add/${params.paperID}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        questionIdArray: [questionID],
      },
    };
    axios(axiosConfig)
      .then((response) => {
        toast.success("Question added to the paper successfully");
      })
      .catch((err) => {
        err.response.data.message ===
          "Duplicate id, 65bc78b5bf33faf33d699199 already exists in question list" &&
          toast.error("Question already added to the paper");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateQuestionOrder = () => {
    const selectedQuestionIdArray = selectedQuestionsList
      .filter((question) => question._id)
      .map((question) => question._id);

    setLoading(true);
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}papers/update-questions/${params.paperID}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        questionIdArray: selectedQuestionIdArray,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        toast.success("Question order updated successfully");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filteredQuestions: Question[] =
    allQuestionsList &&
    allQuestionsList.filter((item) => {
      return item.question.includes(tableSearch);
    });

  return (
    <div>
      <SectionTitle
        title={
          paper?.name && paper?.paperId
            ? `${paper?.name} : ${paper?.paperId}`
            : "Loading..."
        }
        backBtn
      />
      <SectionSubTitle
        title={`Added questions : count ${paper?.questions.length}`}
      />
      <div className="flex justify-between items-center w-full gap-3 mb-3">
        <div className="flex justify-between items-center bg-blue-50 px-4 py-2 rounded-xl gap-2 flex-grow">
          <p className="text-blue-600 text-sm italic">
            Arrange the questions in the desired order by simply dragging them
            into place.
          </p>
        </div>
        <div
          className="h-full w-max bg-blue-600 rounded-xl shadow px-6 py-2 cursor-pointer"
          onClick={updateQuestionOrder}
        >
          <p className="text-sm text-white">Update question order</p>
        </div>
      </div>
      <div className={table().base({ className: "mb-5" })}>
        <div
          className={table().headerRow({
            className: "grid grid-cols-8",
          })}
        >
          {selectedQuestionsHeaders.map((header) => (
            <div
              className={table().headerItem({
                className: `${header === "question" && "col-span-4"}`,
              })}
              key={header}
            >
              {header}
            </div>
          ))}
        </div>
        <Reorder.Group
          axis="y"
          values={selectedQuestionsList}
          onReorder={setSelectedQuestionsList}
          className="flex flex-col gap-2 w-full"
        >
          {selectedQuestionsList.map((row: Question, index: number) => {
            const regex: RegExp = /(<([^>]+)>)/gi;

            const questionToView = row.question.replace(regex, "");

            return (
              <Reorder.Item
                key={row._id}
                value={row}
                className="bg-white p-3 w-full grid grid-cols-8 gap-3 rounded-xl shadow cursor-pointer"
              >
                <div className={table().rowItem({ className: "font-medium" })}>
                  {index + 1}
                </div>
                <div
                  className={table().rowItem({
                    className: "col-span-4 font-medium",
                  })}
                >
                  {questionToView}
                </div>
                <div className={table().rowItem()}>{row.module.name}</div>
                <div className={table().rowItem()}>{row.difficulty}</div>
                <div className={table().rowItem()}>
                  <Modal
                    viewButton={
                      <div className="bg-red-600 py-1 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer">
                        <MinusIcon classes="h-3 w-3 text-white" />
                        <p className="text-white text-xs">Remove</p>
                      </div>
                    }
                    modalTitle={"Alert !"}
                    children={
                      <p className="">
                        Are you sure want to remove{" "}
                        <span className="font-medium">
                          {questionToView.slice(0, 40)}
                          {questionToView.length >= 40 && "..."}
                        </span>{" "}
                        from the paper?
                      </p>
                    }
                    handleSubmit={() => removeQuestion(row._id)}
                    submitBtn={
                      <div className="flex outline-none justify-center rounded-md bg-red-100 px-4 py-2 hover:bg-red-200">
                        <p className="capitalize text-sm font-medium text-red-900">
                          Remove
                        </p>
                      </div>
                    }
                  />
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
      <SectionSubTitle title={"All questions"} />
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
          <div />
          <EntriesPerPage
            value={pageSize}
            setValue={setPageSize}
            array={pageSizeArray}
          />
        </div>
        <div
          className={table().headerRow({
            className: "grid grid-cols-8",
          })}
        >
          {allQuestionsHeaders.map((header) => (
            <div
              className={table().headerItem({ className: "first:col-span-3" })}
              key={header}
            >
              {header}
            </div>
          ))}
        </div>
        <div className={table().tableContent()}>
          {allQuestionsList &&
            filteredQuestions.map((row: Question) => {
              const regex: RegExp = /(<([^>]+)>)/gi;

              const questionToView = row.question.replace(regex, "");

              return (
                <div
                  className={table().tableRow({
                    className: "grid grid-cols-8",
                  })}
                  key={row._id}
                >
                  <div
                    className={table().rowItem({
                      className: "col-span-3 font-medium",
                    })}
                  >
                    {questionToView}
                  </div>
                  <div className={table().rowItem()}>{row.subject.name}</div>
                  <div className={table().rowItem()}>
                    {row.subCategory.name}
                  </div>
                  <div className={table().rowItem()}>{row.module.name}</div>
                  <div className={table().rowItem()}>{row.difficulty}</div>
                  <div className={table().rowItem()}>
                    {!selectedQuestionsList.some(
                      (item) => item._id === row._id
                    ) ? (
                      <Modal
                        viewButton={
                          <div className="bg-blue-600 py-1 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer">
                            <PlusIcon classes="h-3 w-3 text-white" />
                            <p className="text-white text-xs">Add</p>
                          </div>
                        }
                        modalTitle={"Add question"}
                        children={
                          <p className="">
                            Are you sure want to add{" "}
                            <span className="font-medium">
                              {questionToView.slice(0, 40)}{" "}
                              {questionToView.length >= 40 && "... "}
                            </span>
                            to the paper?
                          </p>
                        }
                        handleSubmit={() => addQuestion(row._id)}
                        submitBtn={
                          <div className="flex outline-none justify-center rounded-md bg-green-100 px-4 py-2 hover:bg-green-200">
                            <p className="capitalize text-sm font-medium text-green-900">
                              confirm
                            </p>
                          </div>
                        }
                      />
                    ) : (
                      // <div
                      //   className="bg-blue-600 py-1 px-4 rounded-full flex items-center justify-center gap-2 cursor-pointer"
                      //   onClick={() => handleAddQuestionClick(row)}
                      // >
                      //   <PlusIcon classes="h-3 w-3 text-white" />
                      //   <p className="text-white text-xs">Add</p>
                      // </div>
                      <div className="flex items-center justify-center gap-2 cursor-not-allowed">
                        <CloseIcon classes="w-3 h-3 text-red-600" />
                        <p className="text-red-600 font-bold text-xs">
                          Already added
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
};

export default ManagePaperQuestionsPage;
