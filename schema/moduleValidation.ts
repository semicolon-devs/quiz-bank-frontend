import * as yup from "yup";

export const moduleValidationSchema = yup.object().shape({
  module: yup
    .string()
    .min(2, "Module name must be minimum 2 characters")
    .max(100, "Module name must not be more than 100 characters")
    .required("Module name is required"),
});
