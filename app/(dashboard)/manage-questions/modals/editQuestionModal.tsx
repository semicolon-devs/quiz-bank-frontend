"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
// import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { BASE_URL } from "@/config/apiConfig";

import { EditIcon } from "@/components/icons";

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

interface EditQuestionModalProps {
  questionId: string;
}

interface Question {
  answers: { answer: string; number: number; _id: string }[];
  correctAnswer: number[];
  difficulty: string;
  explaination: string;
  module: { name: string; __v: number; _id: string };
  question: string;
  subCategory: { moduleList: any[]; _id: string; name: string; __v: number };
  subject: { _id: string; name: string; subCategories: any[]; __v: number };
  type: string;
  __v: number;
  _id: string;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  questionId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [question, setQuestion] = useState<Question>();
  const [difficultyLevelSelected, setDifficultyLevelSelected] =
    useState<string>();
  const [subjectSelected, setSubjectSelected] = useState<string>();
  const [subjectCategorySelected, setSubjectCategorySelected] =
    useState<string>();
  const [moduleSelected, setModuleSelected] = useState<string>();
  const [questionContent, setQuestionContent] = useState<string>();
  const [answerList, setAnswerList] = useState<
    { content: string; isSelected: boolean }[]
  >([
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
    { content: "", isSelected: false },
  ]);
  const [answerExplaination, setAnswerExplaination] = useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjectCategoryList, setSubjectCategoryList] = useState<
    SubCategory[] | undefined
  >([]);
  const [moduleList, setModuleList] = useState<Module[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // get question
  // get all courses
  useEffect(() => {
    const handleSetAnswerList = (
      answers: { answer: string; number: number; _id: string }[],
      correctAnswer: number[]
    ) => {
      const updatedAnswerList = answerList.map((answer, index) => ({
        content: answers[index]?.answer || "",
        isSelected: correctAnswer.includes(index),
      }));

      // Update the state with the new answerList
      setAnswerList(updatedAnswerList);
    };

    const getQuestion = () => {
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}questions/${questionId}`,
      };
      axios(axiosConfig)
        .then((response) => {
          setQuestion(response.data);
          setDifficultyLevelSelected(response.data.difficulty);
          setSubjectSelected(response.data.subject._id);
          setSubjectCategorySelected(response.data.subCategory._id);
          setModuleSelected(response.data.module._id);
          setQuestionContent(response.data.question);
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
  }, [questionId, answerList]);

  useEffect(() => {
    const getCourses = () => {
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
        });
    };

    getCourses();
  }, []);

  const editQuestion = () => {
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
      method: "PATCH",
      url: `${BASE_URL}questions/${questionId}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {
        subject: subjectSelected,
        subCategory: subjectCategorySelected,
        module: moduleSelected,
        type: "MCQ",
        question: questionContent,
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
  }, [subjectCategoryList, subjectCategorySelected, moduleList]);

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
    <>
      <div onClick={() => onOpen()}>
        <EditIcon classes="w-4 h-4" />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Question
              </ModalHeader>
              <ModalBody>
                <div>
                  <div className="flex flex-col gap-5">
                    <p className="font-semibold">Select Difficulty Level</p>
                    <select
                      value={difficultyLevelSelected}
                      onChange={(e) =>
                        setDifficultyLevelSelected(e.target.value)
                      }
                      className="p-1 border border-blue/25 rounded-lg"
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
                      className="p-1 border border-blue/25 rounded-lg"
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
                      onChange={(e) =>
                        setSubjectCategorySelected(e.target.value)
                      }
                      className="p-1 border border-blue/25 rounded-lg"
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
                      className="p-1 border border-blue/25 rounded-lg"
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
                      value={questionContent}
                      onChange={setQuestionContent}
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
                            <p className="mb-3 font-semibold">
                              Question no {index + 1}
                            </p>
                            <ReactQuill
                              modules={modules}
                              theme="snow"
                              value={item.content}
                              onChange={(value) =>
                                handleQuillChange(index, value)
                              }
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
                      value={answerExplaination}
                      onChange={setAnswerExplaination}
                      placeholder="Answer content goes here..."
                      className="bg-white"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    editQuestion();
                    onClose();
                  }}
                  className="capitalize"
                >
                  confirm changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditQuestionModal;
