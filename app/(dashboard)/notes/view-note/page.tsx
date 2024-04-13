"use client";

import SectionTitle from "@/components/sectionTitle";
import { useSearchParams } from "next/navigation";

export default function NotesPage() {
  const params = useSearchParams();

  const src =
    "https://drive.google.com/file/d/" + params.get("id") + "/preview";

  const name: string = params.get("name")!;
  const subject: string = params.get("subject")!;

  return (
    <>
      <div className=" flexjustify-center p-5">
      <p className="text-4xl font-bold leading-6  py-3 mb-5 ">{name && name}</p>
        <p className="text-xl leading-6  mb-5 ">{subject && subject}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-5 w-full h-full">
        <iframe
          sandbox="allow-scripts allow-same-origin"
          src={src}
          width="100%"
          height="100%"
          allow="autoplay"
        ></iframe>
      </div>
    </>
  );
}
