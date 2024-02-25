export default function QuizLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { questionNo: string; quizId: string };
}) {
  const questionBlocks: {
    _id: number;
    status: string;
  }[] = [
    { _id: 1, status: "correct" },
    { _id: 2, status: "correct" },
    { _id: 3, status: "correct" },
    { _id: 4, status: "correct" },
    { _id: 5, status: "correct" },
    { _id: 6, status: "incorrect" },
    { _id: 7, status: "correct" },
    { _id: 8, status: "correct" },
    { _id: 9, status: "correct" },
    { _id: 10, status: "correct" },
    { _id: 11, status: "correct" },
    { _id: 12, status: "incorrect" },
    { _id: 13, status: "correct" },
    { _id: 14, status: "correct" },
    { _id: 15, status: "correct" },
    { _id: 16, status: "correct" },
    { _id: 17, status: "correct" },
    { _id: 18, status: "correct" },
    { _id: 19, status: "correct" },
    { _id: 20, status: "correct" },
  ];

  const questionBlockStatus = (status: string) => {
    if (status === "incorrect") {
      return "text-white bg-red-500 border-red-500/25";
    } else if (status === "correct") {
      return "text-white bg-blue-500 border-blue-500/25";
    } else {
      return "text-blue-500 bg-white";
    }
  };

  return (
    <section className="w-full h-full">
      <div className="border-b border-dark/25 p-3 flex justify-between items-center">
        <p className="font-semibold text-lg">
          Bio Chemistry Quiz - #{params.quizId}
        </p>
      </div>
      <div className="flex">
        <div className="p-6 grid grid-cols-5 gap-2 h-max">
          {questionBlocks &&
            questionBlocks.map((block, index) => (
              <div
                className={`border rounded-md w-9 h-7 flex justify-center items-center font-semibold ${questionBlockStatus(
                  block.status
                )}`}
                key={block._id}
              >
                {index + 1}
              </div>
            ))}
        </div>
        <div className="p-6 flex flex-grow border-l border-dark/25 ">
          {children}
        </div>
      </div>
    </section>
  );
}
