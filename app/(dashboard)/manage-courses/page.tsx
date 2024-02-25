"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Tab } from "@headlessui/react";

import AddSubjectModal from "./modals/addSubjectModal";
import AddSubjectCategoryModal from "./modals/addSubjectCategoryModal";
import AddModuleModal from "./modals/addModuleModal";
import DeleteSubjectModal from "./modals/deleteSubjectModal";
import EditSubjectModal from "./modals/editSubjectModal";
import DeleteSubjectCategoryModal from "./modals/deleteSubjectCategoryModal";
import EditSubjectCategoryModal from "./modals/editSubjectCategoryModal";
import DeleteModuleModal from "./modals/deleteModuleModal";
import EditModuleModal from "./modals/editModuleModal";

import SectionTitle from "@/components/sectionTitle";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

interface Course {
  _id: string;
  name: string;
  subCategories: {
    _id: string;
    name: string;
    __v: number;
    moduleList: {
      _id: string;
      name: string;
      __v: number;
    }[];
  }[];
  __v: number;
}

export default function ManageCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [selectedSubjectCategory, setSelectedSubjectCategory] =
    useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const extractSubjects = (
    courses: Course[]
  ): { _id: string; name: string }[] => {
    return courses.map(({ _id, name }) => ({ _id, name }));
  };

  const extractSubjectsAndSubCategories = (
    courses: Course[]
  ): {
    _id: string;
    name: string;
    subCategories: {
      _id: string;
      name: string;
    }[];
  }[] => {
    return courses.map(({ _id, name, subCategories }) => ({
      _id,
      name,
      subCategories: subCategories.map(({ _id, name }) => ({ _id, name })),
    }));
  };

  useEffect(() => {
    const getCourses = () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}subjects`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCourses(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCourses();
  }, []);

  function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <SectionTitle title="Manage Courses" />
      <div className="w-full">
        <Tab.Group>
          <div className="flex w-full">
            <Tab.List className="flex flex-col rounded-xl bg-blue-50 p-1 w-1/2">
              {courses.map((subject) => (
                <Tab
                  key={subject._id}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5",
                      "outline-none text-blue-600",
                      selected
                        ? "bg-white shadow"
                        : "hover:bg-white/[0.12] hover:text-blue-800"
                    )
                  }
                >
                  {subject.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="ms-2 w-full">
              {courses.map((subject, idx) => (
                <Tab.Panel key={idx} className={classNames("outline-none")}>
                  <Tab.Group>
                    <div className="flex w-full">
                      <Tab.List className="flex flex-col rounded-xl bg-blue-50 p-1 w-1/2">
                        {subject.subCategories.map((subCategory) => (
                          <Tab
                            key={subCategory._id}
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5",
                                "outline-none text-blue-600",
                                selected
                                  ? "bg-white shadow"
                                  : "hover:bg-white/[0.12] hover:text-blue-800"
                              )
                            }
                          >
                            {subCategory.name}
                          </Tab>
                        ))}
                      </Tab.List>
                      <Tab.Panels className="ms-2 flex flex-grow">
                        {subject.subCategories.map((subCategory, idx) => (
                          <Tab.Panel
                            key={idx}
                            className="outline-none flex flex-col rounded-xl bg-blue-50 p-1 w-full"
                          >
                            <div className="w-full">
                              {subCategory.moduleList.map((module) => (
                                <div
                                  key={module._id}
                                  className="relative w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5 bg-white shadow"
                                >
                                  <h3 className="text-sm font-medium leading-5">
                                    {module.name}
                                  </h3>

                                  <a
                                    href="#"
                                    className={classNames(
                                      "absolute inset-0 rounded-md",
                                      "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                                    )}
                                  />
                                </div>
                              ))}
                            </div>
                          </Tab.Panel>
                        ))}
                      </Tab.Panels>
                    </div>
                  </Tab.Group>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      {/* <div className="my-5 flex items-center justify-end gap-5">
        <AddSubjectModal />
        <AddSubjectCategoryModal subjects={extractSubjects(courses)} />
        <AddModuleModal subjects={extractSubjectsAndSubCategories(courses)} />
      </div>
      <div className="flex w-full flex-col border-2 border-blue-500/25 p-3 rounded-3xl">
        <Tabs
          aria-label="Subjects"
          selectedKey={selectedSubject}
          onSelectionChange={(e) => setSelectedSubject(String(e))}
        >
          {courses &&
            courses.map((course) => (
              <Tab key={course._id} title={course.name}>
                <Card className="bg-blue-500/75 mb-3">
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

                <div className="flex w-full flex-col border-2 border-blue-500/25 p-3 rounded-3xl">
                  <Tabs
                    aria-label="Subject Category List"
                    selectedKey={selectedSubjectCategory}
                    onSelectionChange={(e) =>
                      setSelectedSubjectCategory(String(e))
                    }
                    // size="sm"
                  >
                    {course.subCategories &&
                      course.subCategories.map((category) => (
                        <Tab key={category._id} title={category.name}>
                          <Card className="bg-blue-500/75 mb-3">
                            <CardBody>
                              <div className="flex justify-between items-center">
                                <div className="">
                                  <p className="text-white capitalize text-sm">
                                    subject category name
                                  </p>
                                  <p className="text-white font-semibold text-3xl">
                                    {category.name}
                                  </p>
                                </div>
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

                          <div className="flex flex-col gap-2">
                            {category.moduleList &&
                              category.moduleList.map((module) => (
                                <Card key={module._id}>
                                  <CardBody>
                                    <div className="flex flex-col">
                                      <div className="flex justify-between items-center">
                                        <p className="text-blue-500">
                                          {module.name}
                                        </p>
                                        <div className="flex gap-5">
                                          <EditModuleModal module={module} />
                                          <DeleteModuleModal
                                            module={module}
                                            subCategoryId={category._id}
                                          />
                                        </div>
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
              </Tab>
            ))}
        </Tabs>
      </div> */}
    </div>
  );
}
