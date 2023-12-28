"use client"

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

// interface DeleteQuestionModalProps {
//   question: {
//     _id: string;
//     question: string;
//     subject: string;
//     subCategory: string;
//     module: string;
//     difficulty: string;
//   };
// }

const QuitQuizModal: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const deleteQuestion = () => {
  //   setLoading(true);
  //   const axiosConfig = {
  //     method: "DELETE",
  //     url: `${BASE_URL}questions/${question._id}`,
  //     // headers: {
  //     //   Authorization: `Bearer ${token}`,
  //     // },
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
      <Button
        color="danger"
        size="sm"
        className="font-semibold uppercase"
        onClick={() => onOpen()}
      >
        quit quiz
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Quit Quiz
              </ModalHeader>
              <ModalBody>
                <p className="font-semibold">Are you sure you want to Quit the Quiz?</p>
                <p className="text-sm">Your progress will be saved and you can resume the quiz later</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    // deleteQuestion();
                    onClose();
                  }}
                  className="capitalize"
                >
                  quit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuitQuizModal;
