"use client";

import { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const difficultyLevel = ["Easy", "Medium", "Hard"];
const subject = ["Biology", "Chemistry", "Mathematics"];
const subjectCategory = ["Anatomy", "Epidomology", "Physiology"];

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} className="max-w-xs" />
      {meta.touched && meta.error ? (
        <div className="text-red font-semibold">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function AddQuestionPage() {
  const [question, setQuestion] = useState<string>("");
  const [answer01, setAnswer01] = useState<string>("");
  const [answer02, setAnswer02] = useState<string>("");
  const [answer03, setAnswer03] = useState<string>("");
  const [answer04, setAnswer04] = useState<string>("");
  const [answerExplaination, setAnswerExplaination] = useState<string>("");

  const answers = [
    { label: "Answer 01", state: answer01, setState: setAnswer01 },
    { label: "Answer 02", state: answer02, setState: setAnswer02 },
    { label: "Answer 03", state: answer03, setState: setAnswer03 },
    { label: "Answer 04", state: answer04, setState: setAnswer04 },
  ];

  return (
    <div>
      <h1 className={title()}>Add Question</h1>
      <Formik
        initialValues={{
          difficultyLevel: "",
          subject: "",
          subjectCategory: "",
        }}
        validationSchema={Yup.object({
          difficultyLevel: Yup.string()
            .oneOf(difficultyLevel, "Invalid difficulty level")
            .required("Required"),
          subject: Yup.string()
            .oneOf(subject, "Invalid Subject")
            .required("Required"),
          subjectCategory: Yup.string()
            .oneOf(subjectCategory, "Invalid Subject Category")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="mt-10 flex flex-col gap-5">
          <Select label="Difficulty Level" name="difficultyLevel">
            <option value="">Select difficulty level</option>
            {difficultyLevel &&
              difficultyLevel.map((item) => (
                <option value={item}>{item}</option>
              ))}
          </Select>
          <Select label="Subject" name="subject">
            <option value="">Select subject</option>
            {subject &&
              subject.map((item) => <option value={item}>{item}</option>)}
          </Select>
          <Select label="Subject Cateogory" name="subjectCategory">
            <option value="">Select subject category</option>
            {subjectCategory &&
              subjectCategory.map((item) => (
                <option value={item}>{item}</option>
              ))}
          </Select>
        </Form>
      </Formik>
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
            <div className="grid grid-cols-6">
              <div></div>
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
    </div>
  );
}
