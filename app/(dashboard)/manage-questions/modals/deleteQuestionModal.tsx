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

import { DeleteIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";

type Props = {};

interface DeleteQuestionModalProps {
  question: {
    _id: string;
    question: string;
    subject: string;
    subCategory: string;
    module: string;
    difficulty: string;
  };
}

const DeleteQuestionModal: React.FC<DeleteQuestionModalProps> = ({
  question,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteQuestion = () => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}questions/${question._id}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
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
      <div onClick={() => onOpen()}>
        <DeleteIcon classes="w-4 h-4" />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Question
              </ModalHeader>
              <ModalBody>
                <p className="">
                  Are you sure want to delete{" "}
                  <span className="font-semibold">
                    {question.question}
                  </span>{" "}
                  question from the system?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteQuestion();
                    onClose();
                  }}
                  className="capitalize"
                >
                  delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteQuestionModal;
