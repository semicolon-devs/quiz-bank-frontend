import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        <Spinner />
      </div>
    </div>
  );
}
