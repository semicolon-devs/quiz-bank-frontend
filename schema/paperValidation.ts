import * as yup from "yup";

import { PaperType } from "@/utils/enums";

export const paperValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be minimum 2 characters")
    .max(100, "Name must not be more than 100 characters")
    .required("Name is required"),
  code: yup
    .string()
    .min(4, "Code must be minimum 4 characters")
    .max(10, "Code must not be more than 10 characters")
    .required("Code is required"),

  email: yup
    .string()
    // .min(4, "Code must be minimum 4 characters")
    // .max(10, "Code must not be more than 10 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be minimum 4 characters")
    .required("Password is required"),
  paperType: yup
    .string()
    .oneOf(Object.values(PaperType), "Invalid paper type")
    .required("Paper type is required"),
  isTimed: yup.boolean(),
  time: yup.number(),
});
