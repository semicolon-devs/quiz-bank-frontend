"use client";

import { useState } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";
import { setAuthToken, setRefreshToken } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const resetPassword = () => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/login`,
      data: {
        // email: email,
        // password: password,
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
        router.push(UrlSlugType.HOME)
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Card className="bg-white w-96">
        <CardBody className="flex flex-col gap-3">
          <p className="text-blue-500 capitalize font-bold text-xl">new password</p>
          <p className="text-blue-500 text-sm">
            Please create a new password for your account
          </p>
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
          <Button color="primary" onClick={resetPassword}>
            <p className="capitalize font-semibold">send recovery email</p>
          </Button>
        </CardBody>
      </Card>
      <p className="mt-5 text-sm text-dark">
        Just remebered the password?{" "}
        <NextLink
          className="capitalize font-semibold text-blue-500"
          href="/sign-in"
        >
          sign in
        </NextLink>
      </p>
    </div>
  );
}
