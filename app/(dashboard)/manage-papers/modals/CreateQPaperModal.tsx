"use client";

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
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
// import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { BASE_URL } from "@/config/apiConfig";

import { PlusIcon } from "@/components/icons";
import { getAccess } from "@/helpers/token";

const CreateQPaperModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [paperName, setPaperName] = useState<string>();
  const [paperId, setPaperId] = useState<string>();
  const [time, setTime] = useState<string>();
  const [timed, setTimed] = useState<boolean>(false);
  const [paperType, setPaperType] = useState<string>();
  const [error, setError] = useState<string>();

  const paperTypes = ["ONE ATTEMPT", "MULTIPLE ATTEMPT"];

  const createQPaper = (onCloseFunction: () => void) => {
    setLoading(true);
    setError("");
    if (paperName && paperId && time && paperType) {
      const axiosConfig = {
        method: "POST",
        url: `${BASE_URL}papers`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
        data: {
          paperId: paperId,
          name: paperName,
          timeInMinutes: time && parseInt(time),
          isTimed: timed,
          paperType: paperType,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response);
          onCloseFunction();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Incomplete feilds present");
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => onOpen()} color="primary">
        <PlusIcon classes="w-4 h-4" />
        <p className="uppercase font-semibold ">create q paper</p>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Q Paper
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Paper Name"
                  placeholder="Enter paper name"
                  value={paperName}
                  onValueChange={setPaperName}
                  variant="bordered"
                />
                <Input
                  label="Paper Code"
                  placeholder="Enter paper code"
                  value={paperId}
                  onValueChange={setPaperId}
                  variant="bordered"
                />
                <div className="w-full border-2 border-dark/20 p-2 rounded-xl">
                  <p className="font-semibold text-xs text-dark/75">
                    Select paper type (number of attempts)
                  </p>
                  <select
                    value={paperType}
                    onChange={(e) => setPaperType(e.target.value)}
                    className="w-full text-sm text-dark/75"
                  >
                    <option value="">Select a paper type</option>
                    {paperTypes.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  label="Paper duration"
                  placeholder="Enter time (minutes)"
                  value={time}
                  onValueChange={setTime}
                  variant="bordered"
                />
                <Checkbox isSelected={timed} onValueChange={setTimed}>
                  Is paper timed
                </Checkbox>
                {error && (
                  <div className="border border-red-500 rounded-lg p-3 text-red-500 font-semibold">
                    {error}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    createQPaper(onClose);
                  }}
                  className="capitalize"
                >
                  {loading ? (
                    <Spinner color="success" size="sm" />
                  ) : (
                    "create q pack"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQPaperModal;
