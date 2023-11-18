"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import { title } from "@/components/primitives";

import AddSubjectModal from "./modals/addSubjectModal";
import AddSubjectCategoryModal from "./modals/addSubjectCategoryModal";
import DeleteSubjectModal from "./modals/deleteSubjectModal";
import EditSubjectModal from "./modals/editSubjectModal";
import DeleteSubjectCategoryModal from "./modals/deleteSubjectCategoryModal";
import EditSubjectCategoryModal from "./modals/editSubjectCategoryModal";

import { BASE_URL } from "@/config/apiConfig";

interface Course {
  _id: string;
  name: string;
  subCategories: { _id: string; name: string; __v: number }[];
  __v: number;
}

export default function ManageCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);
  // const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCourses();
  }, []);

  const extractSubjects = (
    courses: Course[]
  ): { _id: string; name: string }[] => {
    return courses.map(({ _id, name }) => ({ _id, name }));
  };

  const getCourses = () => {
    setLoading(true);
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}subjects`,
    };
    axios(axiosConfig)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className={title({ size: "md" })}>Manage Courses</h1>
      <div className="mt-5 flex items-center justify-end gap-5">
        <AddSubjectModal />
        <AddSubjectCategoryModal subjects={extractSubjects(courses)} />
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Subjects"
          selectedKey={selectedSubject}
          onSelectionChange={(e) => setSelectedSubject(String(e))}
        >
          {courses &&
            courses.map((course) => (
              <Tab key={course._id} title={course.name}>
                <Card className="bg-blue/75 mb-3">
                  <CardBody>
                    <div className="flex justify-between items-center">
                      <div className="">
                        <p className="text-white capitalize text-sm">
                          subject name
                        </p>
                        <p className="text-white font-semibold text-3xl">
                          {course.name}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <EditSubjectModal subject={course} />
                        <DeleteSubjectModal subject={course} />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="flex flex-col gap-2">
                  {course.subCategories.map((category) => (
                    <Card key={category._id}>
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <p className="text-blue">{category.name}</p>
                          <div className="flex gap-5">
                            <EditSubjectCategoryModal
                              subCategory={category}
                              />
                            <DeleteSubjectCategoryModal
                              subCategory={category}
                              subjectId={course._id}
                            />
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </Tab>
            ))}
        </Tabs>
      </div>
    </div>
  );
}
