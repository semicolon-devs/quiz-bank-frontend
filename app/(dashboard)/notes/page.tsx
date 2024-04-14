"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClockIcon } from "@/components/icons";
import { getAccess } from "@/helpers/token";
import { BASE_URL } from "@/config/apiConfig";
import Link from "next/link";
import SectionTitle from "@/components/sectionTitle";

interface QPaper {
  title: string;
  fileId: string;
  subject: string;
  _id: string;
}

const formatSubjectLabel = (subject: string) => {
  switch (subject) {
    case "not_specified":
      return "Not Specified"
    case "reading_skills":
      return "Reading Skills and General Knowledge";
    case "logical_reasoning":
      return "Logical Reasoning";
    case "problem_solving":
      return "Problem Solving";
    case "biology":
      return "Biology";
    case "chemistry":
      return "Chemistry";
    case "physics":
      return "Physics";
    case "maths":
      return "Maths";
    default:
      return "Not Specified";
  }
}
const Notes = () => {
  const [loaiding, setLoading] = useState<boolean>(false);
  const [notesList, setNotesList] = useState<QPaper[]>();

  const router = useRouter();

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/notes`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setNotesList(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getQPapers();
  }, []);

  return (
    <div className="p-5">
      <SectionTitle title="View your notes" />

      <div className="w-full grid grid-cols-3 gap-4 p-10">
        {notesList &&
          notesList.map((note) => (
            <div className="flex" key={note._id}>
              <div className="bg-white rounded-xl overflow-hidden shadow w-full flex flex-col justify-between p-5">
                <div className=" items-center justify-between">
                  <p className="text-2xl font-semibold leading-6  pt-3">
                    {note.title}
                  </p>
                  <p className="text-xl leading-6  py-3 mb-5">
                    {formatSubjectLabel(note.subject)}
                  </p>

                  <Link
                    href={{
                      pathname: "notes/view-note/",
                      query: {
                        name: note.title,
                        id: note.fileId,
                        subject: formatSubjectLabel(note.subject),
                      },
                    }}
                  >
                    <button className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center">
                      <p className="text-white text-base">View Paper</p>
                    </button>
                  </Link>

                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
