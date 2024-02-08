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

import { form } from "@/variants/form";

import { registerValidationSchema } from "@/schema/registerValidation";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  const router = useRouter();

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

  const register = (values: FormValues) => {
    setLoading(true);
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/register`,
      data: {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
        router.push(UrlSlugType.LOGIN);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    register(values);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className={base()}>
        <p className={title()}>register</p>
        <Formik
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, handleSubmit, touched }) => (
            <form onSubmit={handleSubmit} className={innerForm()}>
              <div className={formDiv()}>
                <label htmlFor="firstName" className={label()}>
                  First name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className={`${input()} ${
                    errors.firstName && touched.firstName ? labelError() : ""
                  }`}
                />
                <ErrorMessage
                  className={errorMessage()}
                  name="firstName"
                  component="div"
                />
              </div>

              <div className={formDiv()}>
                <label htmlFor="lastName" className={label()}>
                  Last name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className={`${input()} ${
                    errors.lastName && touched.lastName ? labelError() : ""
                  }`}
                />
                <ErrorMessage
                  className={errorMessage()}
                  name="lastName"
                  component="div"
                />
              </div>

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

              <div className={formDiv()}>
                <label htmlFor="confirmPassword" className={label()}>
                  Confirm Password
                </label>
                <div className={passwordDiv()}>
                  <Field
                    name="confirmPassword"
                    type={passwordVisible ? "text" : "password"}
                    className={`${input()} ${
                      errors.confirmPassword && touched.confirmPassword
                        ? labelError()
                        : ""
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
                  name="confirmassword"
                  component="div"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={button()}
              >
                {!loading ? (
                  <p className="">register</p>
                ) : (
                  <Spinner size={30} />
                )}
              </button>
            </form>
          )}
        </Formik>
      </div>
      <p className="mt-5 text-sm text-dark">
        Already have an account?{" "}
        <NextLink
          className="capitalize font-semibold text-blue-500"
          href={UrlSlugType.LOGIN}
        >
          log in
        </NextLink>
      </p>
    </div>
  );
}
