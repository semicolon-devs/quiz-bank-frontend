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
import { getAccess } from "@/helpers/token";

type Props = {};

interface DeleteModuleModalProps {
  module: { _id: string; name: string; __v: number };
  subCategoryId: string;
}

const DeleteModuleModal: React.FC<DeleteModuleModalProps> = ({
  module,
  subCategoryId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [moduleName, setModuleName] = useState<string>(module.name);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteModule = () => {
    setLoading(true);
    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}subjects/module/${subCategoryId}/${module._id}`,
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
      <Button onPress={onOpen} color="danger">
        <p className="uppercase text-white font-semibold">delete</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Module
              </ModalHeader>
              <ModalBody>
                <p className="">
                  Are you sure want to delete{" "}
                  <span className="font-semibold">{moduleName}</span> module
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
                    deleteModule();
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

export default DeleteModuleModal;
