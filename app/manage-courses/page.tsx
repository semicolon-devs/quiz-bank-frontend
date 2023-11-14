"use client";

import { useState } from "react";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";

import { title } from "@/components/primitives";
import { EditIcon, DeleteIcon } from "@/components/icons";

import AddSubjectModal from "@/components/modals/addSubjectModal";
import AddSubjectCategoryModal from "@/components/modals/addSubjectCategoryModal";

const courses = [
  {
    id: 1,
    subject: "Biology",
    subject_category: [
      { id: 1, category: "Anatomy" },
      { id: 2, category: "Physiology" },
      { id: 3, category: "Epidomology" },
    ],
  },
  {
    id: 2,
    subject: "Chemistry",
    subject_category: [
      { id: 1, category: "Organic Chemistry" },
      { id: 2, category: "Inorganic Chemistry" },
      { id: 3, category: "Physical Chemistry" },
    ],
  },
  {
    id: 3,
    subject: "Mathematics",
    subject_category: [
      { id: 1, category: "Calculus" },
      { id: 2, category: "Group Theory" },
      { id: 3, category: "Linear Programming" },
    ],
  },
];

export default function ManageCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState("photos");

  return (
    <div>
      <h1 className={title({ size: "md" })}>Manage Courses</h1>
      <div className="mt-5 flex items-center justify-end gap-5">
        <AddSubjectModal />
        <AddSubjectCategoryModal />
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Subjects"
          selectedKey={selectedSubject}
          onSelectionChange={(e) => setSelectedSubject(e)}
        >
          {courses &&
            courses.map((course) => (
              <Tab key={course.subject} title={course.subject}>
                <div className="flex flex-col gap-2">
                  {course.subject_category.map((category) => (
                    <Card>
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <p className="">{category.category}</p>
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
