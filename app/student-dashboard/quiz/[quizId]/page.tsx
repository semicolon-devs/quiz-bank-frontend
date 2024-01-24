export default async function QuizDetailsPage({
  params,
}: {
  params: { quizId: string };
}) {
  return <div>quiz : {params.quizId} details</div>;
}
