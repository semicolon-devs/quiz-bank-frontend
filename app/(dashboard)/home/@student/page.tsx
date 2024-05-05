"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MarksCardLMS from "@/components/MarksCardLMS/MarksCardLMS"
import SectionTitle from "@/components/sectionTitle";
import SectionSubTitle from "@/components/sectionSubTitle";
import { RootState, useAppDispatch, useAppSelector } from "@/store";

import { table } from "@/variants/table";

import { RightArrowWithTailIcon, RightArrowIcon } from "@/components/icons";

import { getAccess } from "@/helpers/token";
import { BASE_URL } from "@/config/apiConfig";
import { UrlSlugType } from "@/utils/enums/UrlSlug";


const headers = [
  "QUIZ NO",
  "QUIZ NAME",
  "SCORE",
  "QUESTIONS COMPLETED",
  "STATUS",
];

interface UserMark {
  _id: string;
  paperId : {
    _id:string;
    title:string;
  }
  userId: string;
  reading: number;
  logicalAndProblemSolving: number;
  biology: number;
  chemistry: number;
  physicsAndMaths: number;
  didNotAnswer: number;
  wrongAnswer: number;
  corrcetAnswer: number;
  lostmarks: number;
  total: number;
  __v: number;
}

interface QPaper {
  isTimed: boolean;
  name: string;
  paperId: string;
  paperType: string;
  questions: any[];
  timeInMinutes: number;
  __v: number;
  _id: string;
}

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [paperList, setPaperList] = useState<QPaper[]>();
  const [marks, setMarks] = useState<UserMark[]>();
  const router = useRouter();
  const { userDetails } = useAppSelector((state: RootState) => state.auth);

//get marks by user
useEffect(() => {
  const getMarks = async () => {
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}lms/marks/${userDetails?._id}`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setMarks(response.data);
        console.log(response);
        // console.log(userDetails?._id)
      })
      .catch((err) => {
        console.log("Error in get marks by user");
        console.log(err);
      })
      .finally(() => {});
  };

  getMarks();
}, [userDetails?._id]);

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setPaperList(response.data.result);
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
      <SectionTitle title={"Student Dashboard"} />
      
      <div className="mb-4 max-w-full p-5">
        <SectionSubTitle title={"Model Paper Marks"} />
        <div >
          <MarksCardLMS marks = {marks}/>
        </div>
      </div>
    </div>
  );
}
