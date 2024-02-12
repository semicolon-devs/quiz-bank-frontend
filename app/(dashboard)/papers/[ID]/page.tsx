export default async function QuizDetailsPage({
    params,
  }: {
    params: { ID: string };
  }) {
    return <div>quiz : {params.ID} details</div>;
  }
  