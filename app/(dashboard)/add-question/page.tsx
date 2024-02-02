"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/components/primitives";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

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

export default function AddQuestionPage() {
  const [difficultyLevelSelected, setDifficultyLevelSelected] =
    useState<string>(difficultyLevelArr[0]);
  const [subjectSelected, setSubjectSelected] = useState<string>("");
  const [subjectCategorySelected, setSubjectCategorySelected] =
    useState<string>("");
  const [moduleSelected, setModuleSelected] = useState<string>("");
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
  const [courses, setCourses] = useState<Course[]>([]);
  // const [subjectList, setSubjectList] = useState<Course[]>([]);
  const [subjectCategoryList, setSubjectCategoryList] = useState<
    SubCategory[] | undefined
  >([]);
  const [moduleList, setModuleList] = useState<Module[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  // add new quetion
  const handleAddQuestionButtonClick = () => {
    const getCorrectAnswer = () => {
      const correctAnswerArr: number[] = [];
      answerList.map((answer, index) => {
        if (answerList[index].isSelected) {
          correctAnswerArr.push(index);
        }
      });
      return correctAnswerArr;
    };

    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}questions`,
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
        console.log(response);
        window.location.href = "/manage-questions";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const filterAndMapSubCategories = (
      courses: Course[]
    ): SubCategory[] | undefined => {
      const targetSubject = courses.find(
        (subjectFind) => subjectFind._id === subjectSelected
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

    setSubjectCategoryList(filterAndMapSubCategories(courses));
  }, [courses, subjectSelected]);

  useEffect(() => {
    const filterAndMapModules = (
      subjectCategoryList: SubCategory[] | undefined
    ): Module[] | undefined => {
      const targetSubjectCategory =
        subjectCategoryList &&
        subjectCategoryList.find(
          (subjectCategoryFind) =>
            subjectCategoryFind._id === subjectCategorySelected
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
    <div>
      <h1 className={title({ size: "md" })}>Add Question</h1>
      <div className="flex flex-col gap-5 mt-10">
        <p className="font-semibold">Select Difficulty Level</p>
        <select
          value={difficultyLevelSelected}
          onChange={(e) => setDifficultyLevelSelected(e.target.value)}
        >
          {difficultyLevelArr.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <p className="font-semibold">Select Subject</p>
        <select
          value={subjectSelected}
          onChange={(e) => setSubjectSelected(e.target.value)}
        >
          <option value="">Select a subject</option>
          {courses &&
            courses.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <p className="font-semibold">Select Subject Category</p>
        <select
          value={subjectCategorySelected}
          onChange={(e) => setSubjectCategorySelected(e.target.value)}
        >
          <option value="">Select a subject category</option>
          {subjectCategoryList &&
            subjectCategoryList.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <p className="font-semibold">Select Module</p>
        <select
          value={moduleSelected}
          onChange={(e) => setModuleSelected(e.target.value)}
        >
          <option value="">Select a module</option>
          {moduleList &&
            moduleList.map((item) => (
              <option value={item._id} key={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="my-10">
        <p className="font-semibold text-lg">Question</p>
        <ReactQuill
          modules={modules}
          theme="snow"
          onChange={setQuestion}
          placeholder="Question goes here..."
          className="bg-white"
        />
      </div>
      <div className="">
        <p className="font-semibold text-lg">Answers</p>
        <div className="grid grid-cols-6 mt-5">
          <p className="font-semibold">Correct Answer</p>
          <p className="col-span-5 font-semibold">Answer Content</p>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {answerList.map((item, index) => (
            <div className="grid grid-cols-6" key={index}>
              <div>
                <Checkbox
                  isSelected={item.isSelected}
                  onValueChange={() => handleCheckboxChange(index)}
                ></Checkbox>
              </div>
              <div className="col-span-5">
                <p className="mb-3 font-semibold">Question no {index + 1}</p>
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
        <p className="font-semibold text-lg">Answer explaination</p>
        <ReactQuill
          modules={modules}
          theme="snow"
          onChange={setAnswerExplaination}
          placeholder="Answer content goes here..."
          className="bg-white"
        />
      </div>
      <Button
        color="primary"
        className="mt-5"
        onPress={() => handleAddQuestionButtonClick()}
      >
        {loading ? <Spinner color="default" /> : "Add Question"}
      </Button>
    </div>
  );
}
