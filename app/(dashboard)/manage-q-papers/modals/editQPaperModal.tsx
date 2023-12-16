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
import { getAccess } from "@/helpers/token";

interface EditQPaperModalProps {
  qPaper: {
    paperId: string;
    name: string;
    timeInMinutes: number;
    isTimed: boolean;
    paperType: string;
    questions: any[];
    _id: string;
    __v: number;
  };
}

const EditQPaperModal: React.FC<EditQPaperModalProps> = ({
  qPaper,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  // const editQuestion = () => {
  //   setLoading(true);
  //   const axiosConfig = {
  //     method: "PATCH",
  //     url: `${BASE_URL}questions/${questionId}`,
  //     headers: {
  //       Authorization: `Bearer ${getAccess()}`,
  //     },
  //     data: {
  //       subject: subjectSelected,
  //       subCategory: subjectCategorySelected,
  //       module: moduleSelected,
  //       type: "MCQ",
  //       question: questionContent,
  //       answers: [
  //         { number: 1, answer: answerList[0].content },
  //         { number: 2, answer: answerList[1].content },
  //         { number: 3, answer: answerList[2].content },
  //         { number: 4, answer: answerList[3].content },
  //         { number: 5, answer: answerList[4].content },
  //       ],
  //       correctAnswer: getCorrectAnswer(),
  //       explaination: answerExplaination,
  //       difficulty: difficultyLevelSelected,
  //     },
  //   };
  //   axios(axiosConfig)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <>
      <div onClick={() => onOpen()}>
        <EditIcon classes="w-4 h-4" />
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Q Paper
              </ModalHeader>
              <ModalBody>
                <div>edit q paper</div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    // editQuestion();
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

export default EditQPaperModal;
