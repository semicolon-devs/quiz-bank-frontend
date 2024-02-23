import { tv } from "tailwind-variants";

export const table = tv({
  slots: {
    base: "w-full flex flex-col items-center gap-3",
    featuresRow: "w-full gap-3",
    featuresSearchDiv: "flex gap-3 w-full h-full",
    featuresSearchInput:
      "outline-none text-sm bg-white rounded-xl shadow px-3 py-2 w-full",
    featuresSearchButton:
      "p-2 h-10 w-10 bg-blue-600 hover:bg-blue-500 cursor-pointer flex items-center justify-center rounded-xl shadow",
    featuresButton:
      "w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 flex items-center justify-center gap-3 rounded-xl shadow text-white font-medium capitalize",
    headerRow: "w-full rounded-xl bg-white p-3 shadow gap-3",
    headerItem: "text-base text-blue-600 font-semibold capitalize",
    tableContent: "w-full rounded-xl bg-white p-3 shadow flex flex-col",
    tableRow:
      "w-full border-b border-blue-100 py-3 gap-3 last:border-0 last:border-transparent",
    rowItem: "text-sm text-blue-500 font-normal flex items-center",
    paginationDiv: "w-full flex justify-end",
  },
});
