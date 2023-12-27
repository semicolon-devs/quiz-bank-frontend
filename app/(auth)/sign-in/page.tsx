"use client";

import { useState } from "react";

import NextLink from "next/link";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";
import { setAuthToken, setRefreshToken } from "@/helpers/token";

export default function SigninPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signIn = () => {
    setError(undefined);
    setLoading(true);
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
        window.location.href = "/home";
      })
      .catch((err) => {
        setError("incorrect email or password. please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Card className="bg-white w-96">
        <CardBody className="flex flex-col gap-3">
          <p className="text-blue capitalize font-bold text-xl">sign in</p>
          <Input
            label="Email"
            placeholder="Enter email"
            value={email}
            onValueChange={setEmail}
            className="w-full"
            variant="bordered"
          />
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
          <Button color="primary" onClick={signIn}>
            {loading ? (
              <Spinner color="success" size="sm" />
            ) : (
              <p className="capitalize font-semibold">sign in</p>
            )}
          </Button>
          {error && (
            <div className="p-3 border border-red rounded-lg">
              <p className="text-red capitalize text-sm">{error}</p>
            </div>
          )}
        </CardBody>
      </Card>
      <p className="mt-5 text-sm text-dark">
        Don't have an account?{" "}
        <NextLink
          className="capitalize font-semibold text-blue"
          href="/sign-up"
        >
          sign up
        </NextLink>
      </p>
    </div>
  );
}
