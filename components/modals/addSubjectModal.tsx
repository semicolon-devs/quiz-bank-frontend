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

const AddSubjectModal = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subject, setSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const addNewSubject = () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}subjects`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {
        name: subject,
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
      <Button onPress={onOpen} color="primary">
        Add Subject
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Subject
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Subject Name"
                  placeholder="Enter subject name"
                  variant="bordered"
                  value={subject}
                  onValueChange={setSubject}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addNewSubject();
                    onClose();
                  }}
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

export default AddSubjectModal;
