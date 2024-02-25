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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>();

  const forgotPassword = () => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/login`,
      data: {
        email: email,
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
          <p className="text-blue-500 capitalize font-bold text-xl">
            forgot password?
          </p>
          <p className="text-blue-500 text-sm">
            No worries! Just enter your email and we'll send you a reset
            password link.
          </p>
          <Input
            label="Email"
            placeholder="Enter email"
            value={email}
            onValueChange={setEmail}
            className="w-full"
            variant="bordered"
          />
          <Button color="primary" onClick={forgotPassword}>
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
