"use client";

import SectionTitle from "@/components/sectionTitle";
import { useSearchParams } from 'next/navigation'



export default function NotesPage() {

  const params = useSearchParams()
  console.log(params.get('id')) // Logs "search"
  
  const src = "https://drive.google.com/file/d/" + params.get('id') + "/preview";
  console.log(src)
  console.log(params)

  return (
    <>
      <div className="flex justify-center">
        <SectionTitle title={params.get('name')} />
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
