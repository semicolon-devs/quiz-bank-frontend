import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        <Spinner label="Loading ..." color="primary" labelColor="primary" />
      </div>
    </div>
  );
}
