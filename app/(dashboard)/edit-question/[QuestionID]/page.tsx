"use client";

import { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import "react-quill/dist/quill.snow.css";

import SectionTitle from "@/components/sectionTitle";
import Select from "@/components/select";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const difficultyLevelArr = ["Easy", "Medium", "Hard"];

interface Course {
  _id: string;
  name: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  _id: string;
  name: string;
  moduleList: Module[];
}

interface Module {
  _id: string;
  name: string;
}

export default function EditQuestionPage({
  params,
}: {
  params: { QuestionID: string };
}) {
  const [difficultyLevelSelected, setDifficultyLevelSelected] =
    useState<string>(difficultyLevelArr[0]);
  const [courses, setCourses] = useState<Course[]>();
  const [subjectSelected, setSubjectSelected] = useState<Course>();
  const [subjectCategoryList, setSubjectCategoryList] = useState<
    SubCategory[] | undefined
  >();
  const [subjectCategorySelected, setSubjectCategorySelected] =
    useState<SubCategory>();
  const [moduleList, setModuleList] = useState<Module[] | undefined>();
  const [moduleSelected, setModuleSelected] = useState<Module>();
  const [question, setQuestion] = useState<string>("");
  const [answerList, setAnswerList] = useState<
    { content: string; isSelected: boolean }[]
  >([
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
  ]);
  const [answerExplaination, setAnswerExplaination] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleSetAnswerList = (
      answers: { answer: string; number: number; _id: string }[],
      correctAnswer: number[]
    ) => {
      setAnswerList((prevAnswerList) =>
        prevAnswerList.map((answer, index) => ({
          content: answers[index]?.answer || "",
          isSelected: correctAnswer.includes(index),
        }))
      );
    };

    const getQuestion = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions/${params.QuestionID}`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response);
          setDifficultyLevelSelected(response.data.difficulty);
          setSubjectSelected(response.data.subject);
          setSubjectCategorySelected(response.data.subCategory);
          setModuleSelected(response.data.module);
          setQuestion(response.data.question);
          setAnswerExplaination(response.data.explaination);
          const correctAnswer = response.data.correctAnswer;
          const answers = response.data.answers;
          handleSetAnswerList(answers, correctAnswer);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getQuestion();
  }, [params]);

  // get all courses
  useEffect(() => {
    const getCourses = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}subjects`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getCourses();
  }, []);

  // edit new quetion
  const handleEditQuestionButtonClick = () => {
    const getCorrectAnswer = () => {
      const correctAnswerArr: number[] = [];
      answerList.map((answer, index) => {
        if (answerList[index].isSelected) {
          correctAnswerArr.push(index);
        }
      });
      return correctAnswerArr;
    };

    if (!subjectSelected) {
      toast.error("Please select a subject");
    } else if (!subjectCategorySelected) {
      toast.error("Please select a subject category");
    } else if (!moduleSelected) {
      toast.error("Please select a module");
    } else if (question.length <= 0) {
      toast.error("Please add content for the question");
    } else if (
      answerList[0].content.length <= 0 ||
      answerList[1].content.length <= 0 ||
      answerList[2].content.length <= 0 ||
      answerList[3].content.length <= 0 ||
      answerList[4].content.length <= 0
    ) {
      toast.error("Please add content for the all 5 answers");
    } else if (getCorrectAnswer().length <= 0) {
      toast.error("Please select atleast one correct answer");
    } else if (answerExplaination.length <= 0) {
      toast.error("Please add content for answer explanation");
    } else {
      setLoading(true);
      const axiosConfig = {
        method: "PATCH",
        url: `${BASE_URL}questions/${params.QuestionID}`,
        data: {
          subject: subjectSelected,
          subCategory: subjectCategorySelected,
          module: moduleSelected,
          type: "MCQ",
          question: question,
          answers: [
            { number: 1, answer: answerList[0].content },
            { number: 2, answer: answerList[1].content },
            { number: 3, answer: answerList[2].content },
            { number: 4, answer: answerList[3].content },
            { number: 5, answer: answerList[4].content },
          ],
          correctAnswer: getCorrectAnswer(),
          explaination: answerExplaination,
          difficulty: difficultyLevelSelected,
        },
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          toast.success("Question was updated successfully");
          router.push(UrlSlugType.MANAGE_QUESTIONS);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const filterAndMapSubCategories = (
      courses: Course[]
    ): SubCategory[] | undefined => {
      const targetSubject = courses.find(
        (subjectFind) => subjectFind._id === subjectSelected?._id
      );

      if (!targetSubject) {
        return undefined;
      }

      return targetSubject.subCategories.map(({ _id, name, moduleList }) => ({
        _id,
        name,
        moduleList,
      }));
    };

    courses && setSubjectCategoryList(filterAndMapSubCategories(courses));
  }, [courses, subjectSelected]);

  useEffect(() => {
    const filterAndMapModules = (
      subjectCategoryList: SubCategory[] | undefined
    ): Module[] | undefined => {
      const targetSubjectCategory =
        subjectCategoryList &&
        subjectCategoryList.find(
          (subjectCategoryFind) =>
            subjectCategoryFind._id === subjectCategorySelected?._id
        );

      if (!targetSubjectCategory) {
        return undefined;
      }

      return targetSubjectCategory.moduleList.map(({ _id, name }) => ({
        _id,
        name,
      }));
    };

    setModuleList(filterAndMapModules(subjectCategoryList));
  }, [subjectCategoryList, subjectCategorySelected]);

  const handleCheckboxChange = (index: number) => {
    setAnswerList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleQuillChange = (index: number, value: string) => {
    setAnswerList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, content: value } : item))
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <SectionTitle title="Edit Question" backBtn />
      <div className="flex flex-col gap-1">
        <p className="font-semibold">Select Difficulty Level</p>
        <Select
          value={difficultyLevelSelected}
          setValue={setDifficultyLevelSelected}
          array={difficultyLevelArr}
        />
      </div>
      <p className="font-semibold">Select Subject</p>
      <Select
        value={subjectSelected}
        setValue={setSubjectSelected}
        array={courses}
      />
      <p className="font-semibold">Select Subject Category</p>
      <Select
        value={subjectCategorySelected}
        setValue={setSubjectCategorySelected}
        array={subjectCategoryList}
      />
      <p className="font-semibold">Select Module</p>
      <Select
        value={moduleSelected}
        setValue={setModuleSelected}
        array={moduleList}
      />
      <div className="my-10">
        <p className="font-semibold text-lg mb-3">Question</p>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={question}
          onChange={setQuestion}
          placeholder="Question goes here..."
          className="bg-white"
        />
      </div>
      <div className="">
        <div className="grid grid-cols-12 mt-5">
          <p className="font-semibold">Correct Answer</p>
          <p className="col-span-11 font-semibold">Answer Content</p>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {answerList.map((item, index) => (
            <div className="grid grid-cols-12" key={index}>
              <label
                className="relative flex items-start cursor-pointer w-max"
                htmlFor="blue"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer shadow relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-100 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:bg-green-300 before:opacity-0 before:transition-opacity checked:border-green-600 checked:bg-green-600"
                  id="blue"
                  checked={item.isSelected}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2.5 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <div className="col-span-11">
                <p className="mb-3 font-semibold">Answer no {index + 1}</p>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={item.content}
                  onChange={(value) => handleQuillChange(index, value)}
                  placeholder="Answer content goes here..."
                  className="bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-semibold text-lg mb-3">Answer explaination</p>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={answerExplaination}
          onChange={setAnswerExplaination}
          placeholder="Answer content goes here..."
          className="bg-white"
        />
      </div>
      <button
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-xl shadow font-medium hover:bg-blue-500 w-max"
        onClick={() => handleEditQuestionButtonClick()}
      >
        Update Question
      </button>
    </div>
  );
}
