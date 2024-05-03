"use client"

import { useEffect, useState } from "react";
import axios from "axios";
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

const subjects = [
  "reading_skills",
  "general_knowledge",
  "logical_reasoning",
  "problem_solving",
  "biology",
  "chemistry",
  "physics",
  "maths",
  "not_specified" // New subject added
];

const formatSubjectLabel = (subject: string) => {
  switch (subject) {
    case "reading_skills":
      return "Reading Skills";
    case "general_knowledge":
      return "General Knowledge";
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
    case "not_specified":
      return "Not Specified"; // Added case for new subject
    default:
      return "Not Specified";
  }
};

const Notes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notesBySubject, setNotesBySubject] = useState<{ [key: string]: QPaper[] }>({});

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}lms/notes`, {
          headers: {
            Authorization: `Bearer ${getAccess()}`
          }
        });
        const notes = response.data;
        const notesGroupedBySubject: { [key: string]: QPaper[] } = {};

        subjects.forEach(subject => {
          notesGroupedBySubject[subject] = notes.filter((note: { subject: string; }) => note.subject === subject);
        });

        setNotesBySubject(notesGroupedBySubject);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-5">
      <SectionTitle title="View your notes" />
      <div className="w-full mt-10">
        {subjects.map((subject, index) => (
          <div key={subject}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500 ">
                {formatSubjectLabel(subject)}
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                  </svg>
                </div>
              </summary>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                {notesBySubject[subject]?.map(note => (
                  <div key={note._id} className="bg-white rounded-xl overflow-hidden shadow flex justify-between p-3">
                    <p className="font-semibold leading-6 mb-2">{note.title}</p>
                    <Link
                      href={{
                        pathname: "notes/view-note/",
                        query: {
                          name: note.title,
                          id: note.fileId,
                          subject: formatSubjectLabel(note.subject)
                        }
                      }}
                    >
                      <button className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-1 w-max flex gap-2 items-center justify-center text-white text-base">View Paper</button>
                    </Link>
                  </div>
                ))}
              </div>
            </details>
            {index !== subjects.length - 1 && <hr className="my-4" />} {/* Add a divider if not the last subject */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
