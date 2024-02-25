import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  totalQuestions: number;
  answeredArray?: number[];
  review?: boolean;
  directingURL: string;
  activeQuestion: string;
};

const QuestionBlock = ({
  totalQuestions,
  answeredArray = [],
  review = false,
  directingURL,
  activeQuestion,
}: Props) => {
  const router = useRouter();

  return (
    <>
      {Array.from({ length: totalQuestions }, (block, i) => i).map((i) => (
        <div
          key={i}
          className={` border border-blue-100 ${
            parseInt(activeQuestion) == i + 1 &&
            "outline outline-offset-1 outline-2 outline-blue-600"
          } rounded-md w-9 h-7 flex justify-center items-center font-semibold cursor-pointer hover:bg-blue-200 ${
            !review && answeredArray.includes(i + 1)
              ? "text-white bg-blue-600 hover:bg-blue-400"
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
