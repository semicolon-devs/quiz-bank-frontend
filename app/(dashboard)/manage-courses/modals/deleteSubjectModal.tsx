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

import { BASE_URL } from "@/config/apiConfig";

type Props = {};

interface DeleteSubjectModalProps {
  subject: {
    _id: string;
    name: string;
    subCategories: any[];
    __v: number;
  };
}

const DeleteSubjectModal: React.FC<DeleteSubjectModalProps> = ({ subject }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subjectName, setSubjectName] = useState<string>(subject.name);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSubject = () => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}subjects/${subject._id}`,
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
      <Button onPress={onOpen} color="danger">
        <p className="uppercase text-white font-semibold">delete</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Subject
              </ModalHeader>
              <ModalBody>
                <p className="">
                  Are you sure want to delete{" "}
                  <span className="font-semibold">{subjectName}</span> subject
                  from the system?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteSubject();
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

export default DeleteSubjectModal;
