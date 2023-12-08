export default function QuizDetailsPage({
  params,
}: {
  params: { questionNo: string; quizId: string };
}) {
  return (
    <div>
      quiz {params.quizId} : question {params.questionNo} details
    </div>
  );
}
