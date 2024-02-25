import * as yup from "yup";

export const subjectValidationSchema = yup.object().shape({
  subject: yup
    .string()
    .min(2, "Subject name must be minimum 2 characters")
    .max(100, "Subject name must not be more than 100 characters")
    .required("Subject name is required"),
});
