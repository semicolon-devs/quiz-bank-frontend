import QuitQuizModal from "./modals/QuitQuizModal";

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
    { _id: 1, status: "answered" },
    { _id: 2, status: "answered" },
    { _id: 3, status: "answered" },
    { _id: 4, status: "viewed" },
    { _id: 5, status: "answered" },
    { _id: 6, status: "answered" },
    { _id: 7, status: "answered" },
    { _id: 8, status: "answered" },
    { _id: 9, status: "answered" },
    { _id: 10, status: "active" },
    { _id: 11, status: "not viewed" },
    { _id: 12, status: "not viewed" },
    { _id: 13, status: "not viewed" },
    { _id: 14, status: "not viewed" },
    { _id: 15, status: "not viewed" },
    { _id: 16, status: "not viewed" },
    { _id: 17, status: "not viewed" },
    { _id: 18, status: "not viewed" },
    { _id: 19, status: "not viewed" },
    { _id: 20, status: "not viewed" },
  ];

  const questionBlockStatus = (status: string) => {
    if (status === "not viewed") {
      return "text-blue bg-white";
    } else if (status === "answered") {
      return "text-white bg-blue";
    } else if (status === "active") {
      return "text-blue bg-blue/25";
    } else {
      return "text-blue bg-white";
    }
  };

  return (
    <section className="w-full h-full">
      <div className="border-b border-dark/25 p-3 flex justify-between items-center">
        <p className="font-semibold text-lg">
          Bio Chemistry Quiz - #{params.quizId}
        </p>
        <QuitQuizModal />
      </div>
      <div className="flex">
        <div className="p-6 grid grid-cols-5 gap-2 h-max">
          {questionBlocks &&
            questionBlocks.map((block, index) => (
              <div
                className={`border border-blue/25 rounded-md w-9 h-7 flex justify-center items-center font-semibold ${questionBlockStatus(
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
