"use client";

import { useState } from "react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";
import { setAuthToken, setRefreshToken } from "@/helpers/token";

export default function SigninPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signIn = () => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/login`,
      data: {
        email: email,
        password: password
      }
    };
    axios(axiosConfig)
      .then((response) => {
        setAuthToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        window.location.href = "/home";
      })
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <Card className="bg-white">
        <CardBody className="flex flex-col gap-5">
          <p className="text-blue capitalize font-bold">sign in</p>
          <Input
            label="email"
            placeholder="Enter email"
            value={email}
            onValueChange={setEmail}
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
          <Button color="primary" onClick={signIn}>
            <p className="capitalize font-semibold">sign in</p>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
