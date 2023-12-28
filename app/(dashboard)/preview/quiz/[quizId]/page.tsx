export default function QuizDetailsPage({
  params,
}: {
  params: { quizId: string };
}) {
  return <div>quiz : {params.quizId} details</div>;
}
