import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
    firstName: yup.string()
      .min(2, "Name must be minimum 2")
      .max(100, "Name must not be more than 100 characters")
      .required("Name is required"),
    lastName: yup.string()
      .min(2, "Name must be minimum 2")
      .max(100, "Name must not be more than 100 characters")
      .required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });