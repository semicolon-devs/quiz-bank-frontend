import { Button } from "@nextui-org/button";

import { FilledCheckIcon } from "@/components/icons";

export default function QuizDetailsPage({
  params,
}: {
  params: { quizId: string };
}) {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-white w-72 h-max flex justify-center items-center flex-col rounded-lg p-5">
        <FilledCheckIcon classes="text-green w-16 h-16" />
        <p className="uppercase font-semibold text-sm mt-5">
          quiz #{params.quizId}
        </p>
        <p className="uppercase font-bold text-lg">Bio Chemistry Quiz</p>
        <p className="text-3xl uppercase font-extrabold">80/100</p>
        <Button color="primary" className="w-full mt-5 uppercase font-semibold">
          Review Answers
        </Button>
      </div>
    </div>
  );
}
