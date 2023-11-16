"use client";

import { useState, useEffect } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";

export default function SigninPage() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <Card className="bg-white">
        <CardBody className="flex flex-col gap-5">
          <p className="text-blue capitalize font-bold">sign in</p>
          <Input
            label="username"
            placeholder="Enter username"
            value={username}
            onValueChange={setUsername}
            className="w-64"
            variant="bordered"
          />
          <Input
            label="password"
            placeholder="Enter password"
            value={password}
            onValueChange={setPassword}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeCloseIcon classes="text-2xl text-default-400 pointer-events-none h-5 w-5" />
                ) : (
                  <EyeOpenIcon classes="text-2xl text-default-400 pointer-events-none h-5 w-5" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-64"
            variant="bordered"
          />
          <Button color="primary">
            <p className="capitalize font-semibold">sign in</p>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
