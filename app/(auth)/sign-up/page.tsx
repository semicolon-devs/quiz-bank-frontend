"use client";

import { useState } from "react";

import NextLink from "next/link";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";
import { setAuthToken, setRefreshToken } from "@/helpers/token";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signUp = () => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/login`,
      data: {
        email: email,
        password: password,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setAuthToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.href = "/home";
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Card className="bg-white w-96">
        <CardBody className="flex flex-col gap-3">
          <p className="text-blue capitalize font-bold  text-xl">sign up</p>
          <Input
            label="Email"
            placeholder="Enter email"
            value={email}
            onValueChange={setEmail}
            className="w-full"
            variant="bordered"
          />
          <div className="w-full flex gap-3">
            <Input
              label="First Name"
              placeholder="Enter First Name"
              value={firstName}
              onValueChange={setFirstName}
              className="w-full"
              variant="bordered"
            />
            <Input
              label="Last Name"
              placeholder="Enter Last Name"
              value={lastName}
              onValueChange={setLastName}
              className="w-full"
              variant="bordered"
            />
          </div>
          <Input
            label="Password"
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
            className="w-full"
            variant="bordered"
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
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
            className="w-full"
            variant="bordered"
          />
          <Button color="primary" onClick={signUp}>
            <p className="capitalize font-semibold">sign up</p>
          </Button>
        </CardBody>
      </Card>
      <p className="mt-5 text-sm text-dark">
        Already have an account?{" "}
        <NextLink
          className="capitalize font-semibold text-blue"
          href="/sign-in"
        >
          sign in
        </NextLink>
      </p>
    </div>
  );
}
