"use client";

import { useState } from "react";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";
import NextLink from "next/link";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

import Spinner from "@/components/spinner";

import { EyeOpenIcon, EyeCloseIcon } from "@/components/icons";
import axios from "axios";
import { BASE_URL } from "@/config/apiConfig";
import { setAuthToken, setRefreshToken } from "@/helpers/token";

import { form } from "@/variants/form";

import { loginValidationSchema } from "@/schema/loginValidation";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const {
    base,
    input,
    formDiv,
    errorMessage,
    label,
    labelError,
    button,
    innerForm,
    title,
    passwordDiv,
    eyeBox,
    eyeIcons,
  } = form();

  const logIn = (values: FormValues) => {
    setError(undefined);
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/login`,
      data: {
        email: values.email,
        password: values.password,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setAuthToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        router.push(UrlSlugType.HOME);
      })
      .catch((err) => {
        setError("incorrect email or password. please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    logIn(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className={base()}>
        <p className={title()}>log in</p>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit} className={innerForm()}>
              <div className={formDiv()}>
                <label htmlFor="email" className={label()}>
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`${input()} ${
                    errors.email && touched.email ? labelError() : ""
                  }`}
                />
                <ErrorMessage
                  className={errorMessage()}
                  name="email"
                  component="div"
                />
              </div>

              <div className={formDiv()}>
                <label htmlFor="password" className={label()}>
                  Password
                </label>
                <div className={passwordDiv()}>
                  <Field
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    className={`${input()} ${
                      errors.password && touched.password ? labelError() : ""
                    }`}
                  />
                  <div
                    className={eyeBox()}
                    onClick={() => setPasswordVisible((prev) => !prev)}
                    title={!passwordVisible ? "Show Password" : "Hide Password"}
                  >
                    {!passwordVisible ? (
                      <EyeCloseIcon classes={eyeIcons()} />
                    ) : (
                      <EyeOpenIcon classes={eyeIcons()} />
                    )}
                  </div>
                </div>
                <ErrorMessage
                  className={errorMessage()}
                  name="password"
                  component="div"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={button()}
              >
                {!loading ? <p className="">log in</p> : <Spinner size={30} />}
              </button>
            </form>
          )}
        </Formik>
      </div>
      <p className="mt-5 text-sm text-dark">
        Don't have an account?{" "}
        <NextLink
          className="capitalize font-semibold text-blue-500"
          href={UrlSlugType.REGISTER}
        >
          register
        </NextLink>
      </p>
    </div>
  );
}
