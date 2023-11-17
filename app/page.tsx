import NextLink from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"></section>
  );
}
