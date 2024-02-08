import { tv } from "tailwind-variants";

export const form = tv({
  slots: {
    base: "flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white p-5 shadow-md shadow-blue-500",
    title: "text-2xl font-bold capitalize",
    innerForm: "flex flex-col gap-2",
    formDiv: "flex w-full flex-col gap-px",
    label: "font-semibold",
    labelError: "border border-red-500",
    input: "w-full rounded-lg p-2 outline-none border border-blue-500/10 text-sm",
    passwordDiv: "flex gap-3",
    eyeBox:
      "cursor-pointer rounded-lg border border-blue-500/10 px-2 py-1 outline-none flex items-center justify-center",
    eyeIcons: "h-5 w-5 text-blue-500/75",
    errorMessage: "text-sm text-red-500",
    button:
      "mt-2 flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium capitalize text-white hover:bg-darkBlue/75 focus:outline-none",
  },
});
