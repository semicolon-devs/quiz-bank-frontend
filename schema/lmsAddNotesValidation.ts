import * as yup from "yup";

import { PaperType } from "@/utils/enums";

export const lmsAddNotesValidation = yup.object().shape({
  title: yup.string().required("Name is required"),
  subject: yup.string().required("Subjext is required"),
  fileId: yup
    .string()
    // .min(4, "Code must be minimum 4 characters")
    // .max(10, "Code must not be more than 10 characters")
    .required("Link is required"),
});
