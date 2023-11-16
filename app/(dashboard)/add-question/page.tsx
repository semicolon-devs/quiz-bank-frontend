"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { title } from "@/components/primitives";

import { BASE_URL } from "@/config/apiConfig";

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
  subCategories: any[];
  __v: number;
}

interface SubCategory {
  _id: string;
  name: string;
}

export default function AddQuestionPage() {
  const [difficultyLevelSelected, setDifficultyLevelSelected] =
    useState<string>(difficultyLevelArr[0]);
  const [subjectSelected, setSubjectSelected] = useState<string>("");
  const [subjectCategorySelected, setSubjectCategorySelected] =
    useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer01, setAnswer01] = useState<string>("");
  const [isA01Selected, setIsA01Selected] = useState<boolean>(false);
  const [answer02, setAnswer02] = useState<string>("");
  const [isA02Selected, setIsA02Selected] = useState<boolean>(false);
  const [answer03, setAnswer03] = useState<string>("");
  const [isA03Selected, setIsA03Selected] = useState<boolean>(false);
  const [answer04, setAnswer04] = useState<string>("");
  const [isA04Selected, setIsA04Selected] = useState<boolean>(false);
  const [answer05, setAnswer05] = useState<string>("");
  const [isA05Selected, setIsA05Selected] = useState<boolean>(false);
  const [answerExplaination, setAnswerExplaination] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [subjectCategories, setSubjectCategories] = useState<
    { _id: string; name: string }[] | null
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const answers = [
    {
      number: 1,
      label: "Answer 01",
      selectedState: isA01Selected,
      setSelectedState: setIsA01Selected,
      state: answer01,
      setState: setAnswer01,
    },
    {
      number: 2,
      label: "Answer 02",
      selectedState: isA02Selected,
      setSelectedState: setIsA02Selected,
      state: answer02,
      setState: setAnswer02,
    },
    {
      number: 3,
      label: "Answer 03",
      selectedState: isA03Selected,
      setSelectedState: setIsA03Selected,
      state: answer03,
      setState: setAnswer03,
    },
    {
      number: 4,
      label: "Answer 04",
      selectedState: isA04Selected,
      setSelectedState: setIsA04Selected,
      state: answer04,
      setState: setAnswer04,
    },
    {
      number: 5,
      label: "Answer 05",
      selectedState: isA05Selected,
      setSelectedState: setIsA05Selected,
      state: answer05,
      setState: setAnswer05,
    },
  ];

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    extractSubjects();
  }, [courses]);

  useEffect(() => {
    setSubjectCategories(getSubCategories(subjectSelected));
  }, [subjectSelected]);

  const extractSubjects = () => {
    setSubjects(courses.map(({ _id, name }) => ({ _id, name })));
  };

  const getSubCategories = (subjectId: string): SubCategory[] | null => {
    const subject = courses.find((s) => s._id === subjectId);

    if (subject) {
      return subject.subCategories.map(({ _id, name }) => ({ _id, name }));
    }

    return null;
  };

  const getCourses = () => {
    setLoading(true);
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}subjects`,
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

  const handleAddQuestionButtonClick = () => {
    const getCorrectAnswer = () => {
      const correctAnswerArr: number[] = [];
      answers.map((answer) => {
        if (answer.selectedState) {
          correctAnswerArr.push(answer.number);
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
        type: "MCQ",
        question: question,
        answers: [
          { number: 1, answer: answer01 },
          { number: 2, answer: answer02 },
          { number: 3, answer: answer03 },
          { number: 4, answer: answer04 },
        ],
        correctAnswer: getCorrectAnswer(),
        explaination: answerExplaination,
        difficulty: difficultyLevelSelected,
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
        {/* <Select
          label="Favorite Animal"
          variant="bordered"
          placeholder="Select an animal"
          selectedKeys={subjectSelected}
          className="max-w-xs"
          onSelectionChange={(e) => setSubjectSelected(e)}
        >
          {subjects.map((subject) => (
            <SelectItem key={subject._id} value={subject._id}>
              {subject.name}
            </SelectItem>
          ))}
        </Select> */}
        <select
          value={subjectSelected}
          onChange={(e) => setSubjectSelected(e.target.value)}
        >
          {subjects.map((item) => (
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
          {subjectCategories &&
            subjectCategories.map((item) => (
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
          {answers.map((item) => (
            <div className="grid grid-cols-6" key={item.label}>
              <div>
                <Checkbox
                  isSelected={item.selectedState}
                  onValueChange={item.setSelectedState}
                ></Checkbox>
              </div>
              <div className="col-span-5">
                <p className="mb-3 font-semibold">{item.label}</p>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  onChange={item.setState}
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
        Add Question
      </Button>
    </div>
  );
}
