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
import { getAccess } from "@/helpers/token";

type Props = {};

interface DeleteQPaperModalProps {
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

const DeleteQPaperModal: React.FC<DeleteQPaperModalProps> = ({ qPaper }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const deleteQuestion = () => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}papers/${qPaper._id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
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
      <div onClick={() => onOpen()}>
        <DeleteIcon classes="w-4 h-4" />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Q Paper
              </ModalHeader>
              <ModalBody>
                <p className="">
                  Are you sure want to delete{" "}
                  <span className="font-semibold">{qPaper.name}</span> from the
                  system?
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

export default DeleteQPaperModal;
