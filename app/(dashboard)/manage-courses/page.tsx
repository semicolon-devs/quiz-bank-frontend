"use client";

import { useState, useEffect } from "react";
import axios from "axios";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";

import { title } from "@/components/primitives";
import { EditIcon, DeleteIcon } from "@/components/icons";

import AddSubjectModal from "@/components/modals/addSubjectModal";
import AddSubjectCategoryModal from "@/components/modals/addSubjectCategoryModal";

import { BASE_URL } from "@/config/apiConfig";

interface Course {
  _id: string;
  name: string;
  subCategories: any[];
  __v: number;
}

export default function ManageCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("photos");
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
          onSelectionChange={(e) => setSelectedSubject(e)}
        >
          {courses &&
            courses.map((course) => (
              <Tab key={course._id} title={course.name}>
                <div className="flex flex-col gap-2">
                  {course.subCategories.map((category) => (
                    <Card>
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <p className="text-blue">{category.name}</p>
                          <div className="flex gap-5">
                            <Button color="primary" variant="bordered">
                              <EditIcon />
                            </Button>
                            <Button color="primary" variant="bordered">
                              <DeleteIcon />
                            </Button>
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
