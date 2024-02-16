import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  totalQuestions: number;
  answeredArray?: number[];
  review?: boolean;
  directingURL: string;
};

const QuestionBlock = ({
  totalQuestions,
  answeredArray = [],
  review = false,
  directingURL,
}: Props) => {
  const router = useRouter();

  return (
    <>
      {Array.from({ length: totalQuestions }, (block, i) => i).map((i) => (
        <div
          key={i}
          className={`border border-blue-100 rounded-md w-9 h-7 flex justify-center items-center font-semibold cursor-pointer hover:bg-blue-200 ${
            !review && answeredArray.includes(i + 1)
              ? "text-white bg-blue-500 hover:bg-blue-400"
              : "hover:bg-blue-400"
          }`}
          onClick={() => router.push(`${directingURL}/${i + 1}`)}
        >
          {i + 1}
        </div>
      ))}
    </>
  );
};

export default QuestionBlock;
