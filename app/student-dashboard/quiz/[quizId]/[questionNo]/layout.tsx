export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
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
    { _id: 10, status: "not viewed" },
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

  return (
    <section className="w-full h-full">
      <div className="border-b border-dark/25 h-10"></div>
      <div className="flex">
        <div className="border-r border-dark/25 p-6 grid grid-cols-5 gap-2">
          {questionBlocks &&
            questionBlocks.map((block, index) => (
              <div
                className={`border border-blue w-7 h-7 rounded-md flex justify-center items-center font-semibold ${
                  block.status === "not viewed"
                    ? "text-blue"
                    : block.status === "answered"
                    ? "text-white bg-blue"
                    : "text-blue bg-blue/25"
                }`}
                key={block._id}
              >
                {index + 1}
              </div>
            ))}
        </div>
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}
