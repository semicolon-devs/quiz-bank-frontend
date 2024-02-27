import React from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "../icons";

type Props = {
  title: string;
  noMarginBottom?: boolean;
  backBtn?: boolean;
};

const SectionTitle = ({
  title,
  noMarginBottom = false,
  backBtn = false,
}: Props) => {
  const router = useRouter();

  return (
    <div className={`flex gap-2 items-end ${!noMarginBottom && "mb-4"}`}>
      {backBtn && (
        <div
          className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-50 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon classes={"h-9 w-9 text-blue-700"} />
        </div>
      )}
      <h3 className={`text-3xl text-blue-700 font-semibold capitalize`}>
        {title}
      </h3>
    </div>
  );
};

export default SectionTitle;
