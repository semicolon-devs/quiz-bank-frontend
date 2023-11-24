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

interface SubjectWithSubCategories {
  _id: string;
  name: string;
  subCategories: {
    _id: string;
    name: string;
  }[];
}

interface AddModuleModalProps {
  subjects: SubjectWithSubCategories[];
}

const AddModuleModal: React.FC<AddModuleModalProps> = ({ subjects }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subject, setSubject] = useState<string>();
  const [subjectCategoryList, setSubjectCategoryList] = useState<
    { name: string; _id: string }[] | undefined
  >();
  const [subjectCategory, setSubjectCategory] = useState<string>();
  const [module, setModule] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const filterAndMapSubCategories = (
      subjects: SubjectWithSubCategories[]
    ): { name: string; _id: string }[] | undefined => {
      const targetSubject = subjects.find(
        (subjectFind) => subjectFind._id === subject
      );

      if (!targetSubject) {
        return undefined;
      }

      return targetSubject.subCategories.map(({ _id, name }) => ({
        _id,
        name,
      }));
    };

    setSubjectCategoryList(filterAndMapSubCategories(subjects));
  }, [subject]);

  const addNewModule = () => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}subjects/module/${subjectCategory}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {
        name: module,
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
        Add Module
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Module
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
                <select
                  value={subjectCategory}
                  onChange={(e) => setSubjectCategory(e.target.value)}
                  className="border border-dark p-3 rounded-xl"
                >
                  <option value="">Select subject Category</option>
                  {subjectCategoryList &&
                    subjectCategoryList.map((item) => (
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
                  label="Module Name"
                  placeholder="Enter module name"
                  variant="bordered"
                  value={module}
                  onValueChange={setModule}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    addNewModule();
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

export default AddModuleModal;
