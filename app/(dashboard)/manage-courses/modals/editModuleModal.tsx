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

interface EditModuleModalProps {
  module: { _id: string; name: string; __v: number };
}

const EditModuleModal: React.FC<EditModuleModalProps> = ({ module }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [moduleName, setModuleName] = useState<string>(module.name);
  const [loading, setLoading] = useState<boolean>(false);

  const editModule = () => {
    setLoading(true);
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}subjects/module/${module._id}`,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      data: {
        name: moduleName,
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
        <p className="uppercase text-white font-semibold">edit</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Module
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Module Name"
                  placeholder="Enter new module name"
                  variant="bordered"
                  value={moduleName}
                  onValueChange={setModuleName}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    editModule();
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

export default EditModuleModal;
