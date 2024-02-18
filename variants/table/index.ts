import { tv } from "tailwind-variants";

export const table = tv({
  slots: {
    base: "w-full flex flex-col items-center gap-3",
    headerRow: "w-full rounded-xl bg-white p-3 shadow gap-3",
    headerItem: "text-base text-blue-600 font-semibold capitalize",
    tableContent: "w-full rounded-xl bg-white p-3 shadow flex flex-col gap-2",
    tableRow:
      "w-full border-b border-blue-100 pb-2 gap-3 last:border-0 last:border-transparent",
    rowItem: "text-sm text-blue-500 font-normal flex items-center",
    paginationDiv: "w-full flex justify-end",
  },
});
