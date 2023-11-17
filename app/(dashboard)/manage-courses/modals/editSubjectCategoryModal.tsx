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

interface EditSubjectCategoryModalProps {
  subCategory: { _id: string; name: string; __v: number };
}

const EditSubjectCategoryModal: React.FC<EditSubjectCategoryModalProps> = ({
  subCategory,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [subjectCategoryName, setSubjectCategoryName] = useState<string>(
    subCategory.name
  );
  const [loading, setLoading] = useState<boolean>(false);

  const editSubjectCategory = () => {
    // setLoading(true);
    // const axiosConfig = {
    //   method: "POST",
    //   url: `${BASE_URL}subjects`,
    //   // headers: {
    //   //   Authorization: `Bearer ${token}`,
    //   // },
    //   data: {
    //     name: subject,
    //   },
    // };
    // axios(axiosConfig)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        <p className="uppercase text-white font-semibold">edit</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Subject Category
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Subject Category Name"
                  placeholder="Enter new subject category name"
                  variant="bordered"
                  value={subjectCategoryName}
                  onValueChange={setSubjectCategoryName}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    editSubjectCategory();
                    onClose();
                  }}
                  className="capitalize"
                >
                  change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSubjectCategoryModal;
