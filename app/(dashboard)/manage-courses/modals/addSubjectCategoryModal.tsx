import { useState, useEffect } from "react";
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
// import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { BASE_URL } from "@/config/apiConfig";

interface Subject {
  _id: string;
  name: string;
}

interface AddSubjectCategoryModalProps {
  subjects: Subject[];
}

const AddSubjectCategoryModal: React.FC<AddSubjectCategoryModalProps> = ({
  subjects,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subject, setSubject] = useState<string>();
  const [subjectCategory, setSubjectCategory] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const addNewSubjectCategory = () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}subjects/courses/${subject}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {
        subCategory: subjectCategory,
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
        Add Subject Category
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Subject Category
              </ModalHeader>
              <ModalBody>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border border-dark p-3 rounded-xl"
                >
                  <option value="">Select subject</option>
                  {subjects.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Subject Category Name"
                  placeholder="Enter subject category name"
                  variant="bordered"
                  value={subjectCategory}
                  onValueChange={setSubjectCategory}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={addNewSubjectCategory}>
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

export default AddSubjectCategoryModal;
