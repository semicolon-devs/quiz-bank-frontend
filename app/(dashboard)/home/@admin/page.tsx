"use client";

import SectionTitle from "@/components/sectionTitle";
import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";


interface Stats {
  quizs: number;
  users: number;
  lmsUsers: number;
  notes: number;
  papers: number;
  _id: string;
}


export default function AdminDashboardPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>();

  useEffect(() => {
    const getQPapers = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/settings/dashboard`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setStats(response.data);
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontSize: 20, fontWeight: 500 }}>
          Welcome back to
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontSize: 44,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "primary.main",
          }}
        >
          admin Dashboard
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Card
          variant="elevation"
          sx={{ backgroundColor: "primary.light", padding: 1 }}
        >
          <Typography
            sx={{ fontSize: 18 }}
            color="white"
            variant="h5"
            align="center"
          >
            SMIT ACADEMY (OVERALL)
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          variant="elevation"
          sx={{ backgroundColor: "primary.light", padding: 1 }}
        >
          <Typography
            sx={{ fontSize: 18 }}
            color="white"
            variant="h5"
            align="center"
          >
            LMS
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card
          variant="elevation"
          sx={{ backgroundColor: "primary.light", padding: 1 }}
        >
          <Typography
            sx={{ fontSize: 18 }}
            color="white"
            variant="h5"
            align="center"
          >
            Quiz Bank
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card variant="elevation">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 60, fontWeight: 800 }}
              color="primary.light"
            >
              {stats && stats.lmsUsers}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 500 }}
              color="primary.light"
            >
              Total Students
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card variant="elevation">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 60, fontWeight: 800 }}
              color="primary.light"
            >
              {stats && stats.notes}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 500 }}
              color="primary.light"
            >
              Notes
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card variant="elevation">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 60, fontWeight: 800 }}
              color="primary.light"
            >
              {stats && stats.papers}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 500 }}
              color="primary.light"
            >
              Papers
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card variant="elevation">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 60, fontWeight: 800 }}
              color="primary.light"
            >
              {stats && stats.quizs}
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 500 }}
              color="primary.light"
            >
              Quiz
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card variant="elevation">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 60, fontWeight: 800 }}
              color="primary.light"
            >
              0
            </Typography>
            <Typography
              sx={{ fontSize: 16, fontWeight: 500 }}
              color="primary.light"
            >
              Enrolled Students
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // <>
    //   <div className="flex flex-col lg:flex-row gap-5 mt-8">
    //     <div className="w-full lg:w-1/5">
    //       <div className="p-2 rounded text-center bg-green-700 text-white">
    //         SMIT Academy
    //       </div>
    //       <div className="border border-gray-300 rounded text-center py-8 mt-2">
    //         <h2 className="text-4xl font-bold pb-2">62</h2>
    //         <h4 className="inline text-gray-500 text-sm">Total Students</h4>
    //       </div>
    //     </div>

    //     <div className="w-full lg:w-2/5">
    //       <div className="p-2 rounded text-center bg-green-700 text-white">
    //         Learning Management System
    //       </div>
    //       <div className="flex gap-5 mt-2">
    //         <div className="flex-grow border border-gray-300 rounded text-center py-8">
    //           <h2 className="text-4xl font-bold pb-2">12</h2>
    //           <h4 className="inline text-gray-500 text-sm">Notes</h4>
    //         </div>
    //         <div className="flex-grow border border-gray-300 rounded text-center py-8">
    //           <h2 className="text-4xl font-bold pb-2">10</h2>
    //           <h4 className="inline text-gray-500 text-sm">Papers</h4>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="w-full lg:w-2/5">
    //       <div className="p-2 rounded text-center bg-green-700 text-white">
    //         Quiz Bank
    //       </div>
    //       <div className="flex gap-5 mt-2">
    //         <div className="flex-grow border border-gray-300 rounded text-center py-8">
    //           <h2 className="text-4xl font-bold pb-2">22</h2>
    //           <h4 className="inline text-gray-500 text-sm">Quiz</h4>
    //         </div>
    //         <div className="flex-grow border border-gray-300 rounded text-center py-8">
    //           <h2 className="text-4xl font-bold pb-2">0</h2>
    //           <h4 className="inline text-gray-500 text-sm">
    //             Enrolled Students
    //           </h4>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
