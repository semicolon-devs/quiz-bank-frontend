"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checkbox } from "@nextui-org/checkbox";
import { Button, ButtonGroup } from "@nextui-org/button";

import { title } from "@/components/primitives";

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
const subjectArr = ["Biology", "Chemistry", "Mathematics"];
const subjectCategoryArr = ["Anatomy", "Epidomology", "Physiology"];

export default function AddQuestionPage() {
  const [difficultyLevel, setDifficultyLevel] = useState<string>(
    difficultyLevelArr[0]
  );
  const [subject, setSubject] = useState<string>("");
  const [subjectCategory, setSubjectCategory] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [answer01, setAnswer01] = useState<string>("");
  const [isA01Selected, setIsA01Selected] = useState<boolean>(false);
  const [answer02, setAnswer02] = useState<string>("");
  const [isA02Selected, setIsA02Selected] = useState<boolean>(false);
  const [answer03, setAnswer03] = useState<string>("");
  const [isA03Selected, setIsA03Selected] = useState<boolean>(false);
  const [answer04, setAnswer04] = useState<string>("");
  const [isA04Selected, setIsA04Selected] = useState<boolean>(false);
  const [answerExplaination, setAnswerExplaination] = useState<string>("");

  const answers = [
    {
      label: "Answer 01",
      selectedState: isA01Selected,
      setSelectedState: setIsA01Selected,
      state: answer01,
      setState: setAnswer01,
    },
    {
      label: "Answer 02",
      selectedState: isA02Selected,
      setSelectedState: setIsA02Selected,
      state: answer02,
      setState: setAnswer02,
    },
    {
      label: "Answer 03",
      selectedState: isA03Selected,
      setSelectedState: setIsA03Selected,
      state: answer03,
      setState: setAnswer03,
    },
    {
      label: "Answer 04",
      selectedState: isA04Selected,
      setSelectedState: setIsA04Selected,
      state: answer04,
      setState: setAnswer04,
    },
  ];

  const handleAddQuestionButtonClick = () => {
    console.log("btn click");
  };

  return (
    <div>
      <h1 className={title({ size: "md" })}>Add Question</h1>
      <div className="flex flex-col gap-5 mt-10">
        <p className="font-semibold">Select Difficulty Level</p>
        <select
          value={difficultyLevel}
          onChange={(e) => setDifficultyLevel(e.target.value)}
        >
          {difficultyLevelArr.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <p className="font-semibold">Select Subject</p>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjectArr.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <p className="font-semibold">Select Subject Category</p>
        <select
          value={subjectCategory}
          onChange={(e) => setSubjectCategory(e.target.value)}
        >
          {subjectCategoryArr.map((item) => (
            <option value={item} key={item}>
              {item}
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