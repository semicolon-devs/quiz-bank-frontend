import { useState } from "react";
import axios from "axios";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

import { PlusIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

type Props = {};

interface AddQuestionModalProps {
  question: {
    _id: string;
    question: string;
    subject: string;
    subCategory: string;
    module: string;
    difficulty: string;
  };
  qPaper:
    | {
        paperId: string;
        name: string;
        timeInMinutes: number;
        isTimed: boolean;
        paperType: string;
        questions: any[];
        _id: string;
        __v: number;
      }
    | undefined;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  question,
  qPaper,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  // console.log(qPaper);

  const addQuestion = () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}papers/add/${qPaper?._id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        questionIdArray: [question._id],
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
    <>
      <span
        className="text-lg text-white cursor-pointer active:opacity-50 flex items-center gap-2"
        onClick={() => onOpen()}
      >
        <PlusIcon classes="h-3 w-3" />
        <p className="text-sm uppercase font-semibold">add</p>
      </span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Question to Q Paper
              </ModalHeader>
              <ModalBody>
                <p className="">
                  Please confirm the addition of the question :
                  <span className="font-semibold"> {question.question}</span> to
                  the paper
                  <span className="font-semibold">
                    {" "}
                    {qPaper && qPaper.name}
                  </span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addQuestion();
                    onClose();
                  }}
                  className="capitalize"
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddQuestionModal;
