import * as yup from "yup";

export const subjectCategoryValidationSchema = yup.object().shape({
  subjectCategory: yup
    .string()
    .min(2, "Subject Category name must be minimum 2 characters")
    .max(100, "Subject Category name must not be more than 100 characters")
    .required("Subject Category name is required"),
});
