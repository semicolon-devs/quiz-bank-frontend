"use client"
// pages/studentDashboardPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MarksCardLMS from "@/components/MarksCardLMS/MarksCardLMS";
import SectionTitle from "@/components/sectionTitle";
import SectionSubTitle from "@/components/sectionSubTitle";
import { RootState, useAppSelector } from "@/store";
import { getAccess } from "@/helpers/token";
import { BASE_URL } from "@/config/apiConfig";
import MarksChart from "@/components/charts/Charts";

interface UserMark {
  _id: string;
  paperId: {
    _id: string;
    title: string;
  };
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

  useEffect(() => {
    const getMarks = async () => {
      const accessToken = await getAccess();
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/marks/${userDetails?._id}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setMarks(response.data);
        })
        .catch((err) => {
          // Handle error
        })
        .finally(() => {});
    };

    getMarks();
  }, [userDetails?._id]);

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const accessToken = await getAccess();
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}papers`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPaperList(response.data.result);
        })
        .catch((err) => {
          // Handle error
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
        <SectionSubTitle title={"Marks Chart"} />
        <MarksChart marks={marks} />
      </div>
      <div className="mb-4 max-w-full p-5">
        <SectionSubTitle title={"Model Paper Marks"} />
        <div>
          <MarksCardLMS marks={marks} />
        </div>
      </div>
      
    </div>
  );
}
