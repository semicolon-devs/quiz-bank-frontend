"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Tab } from "@headlessui/react";

import Modal from "@/components/modal";
import AddSubjectModal from "./modals/addSubjectModal";
import AddSubCategoryModal from "./modals/addSubCategoryModal";
import AddModuleModal from "./modals/addModuleModal";
import EditSubjectModal from "./modals/editSubjectModal";
import EditSubjectCategoryModal from "./modals/editSubjectCategoryModal";
import EditModuleModal from "./modals/editModuleModal";

import SectionTitle from "@/components/sectionTitle";

import { DeleteIcon, PlusIcon } from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

import { Course } from "@/types";

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
    const getCourses = async () => {
      setLoading(true);

      const accessToken = await getAccess();

      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}subjects`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((err) => {
          // console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getCourses();
  }, []);

  const deleteSubject = async (id: string) => {
    setLoading(true);

    const accessToken = await getAccess();

    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}subjects/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteSubjectCategory = async ({
    subjectId,
    subCategoryId,
  }: {
    subjectId: string;
    subCategoryId: string;
  }) => {
    setLoading(true);

    const accessToken = await getAccess();

    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}subjects/courses/${subjectId}/${subCategoryId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteModule = async ({
    subCategoryId,
    moduleId,
  }: {
    subCategoryId: string;
    moduleId: string;
  }) => {
    setLoading(true);

    const accessToken = await getAccess();

    const axiosConfig = {
      method: "DELETE",
      url: `${BASE_URL}subjects/module/${subCategoryId}/${moduleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function classNames(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <SectionTitle title="Manage Courses" />
      <div className="grid grid-cols-3 mb-2 bg-white rounded-xl shadow py-2 px-4">
        <p className="px-1 font-semibold text-blue-600">Subject</p>
        <p className="px-5 font-semibold text-blue-600">Subject Category</p>
        <p className="px-9 font-semibold text-blue-600">Module</p>
      </div>
      <div className="w-full">
        <Tab.Group>
          <div className="flex w-full">
            <Tab.List className="flex flex-col rounded-xl bg-blue-50 p-1 w-1/2 gap-1">
              <AddSubjectModal />
              {courses.map((subject) => (
                <Tab
                  key={subject._id}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5 flex justify-between items-center duration-200 ease-in-out",
                      "outline-none text-blue-600",
                      selected
                        ? "bg-white shadow"
                        : "hover:bg-white/[0.12] hover:text-blue-800"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <p className="">{subject.name}</p>
                      {selected && (
                        <div className="flex items-center gap-2 duration-200 ease-in-out">
                          <EditSubjectModal subject={subject} />
                          <Modal
                            viewButton={
                              <div className="cursor-pointer">
                                <DeleteIcon classes={"h-4 w-4 text-red-600"} />
                              </div>
                            }
                            modalTitle={"Alert !"}
                            handleSubmit={() => deleteSubject(subject._id)}
                            submitBtn={
                              <div className="flex  capitalize outline-none justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 hover:bg-red-200">
                                <p className="text-sm font-medium text-red-900">
                                  Remove
                                </p>
                              </div>
                            }
                          >
                            <p className="">
                              Are you sure you want to remove subject{" "}
                              <span className="font-medium">
                                {subject.name}{" "}
                              </span>
                              from the system?
                            </p>
                          </Modal>
                        </div>
                      )}
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="ms-2 w-full">
              {courses.map((subject, idx) => (
                <Tab.Panel key={idx} className={classNames("outline-none")}>
                  <Tab.Group>
                    <div className="flex w-full">
                      <Tab.List className="flex flex-col rounded-xl bg-blue-50 p-1 w-1/2 gap-1">
                        <AddSubCategoryModal subject={subject} />
                        {subject.subCategories.map((subCategory) => (
                          <Tab
                            key={subCategory._id}
                            className={({ selected }) =>
                              classNames(
                                "w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5 flex items-center justify-between",
                                "outline-none text-blue-600 duration-200 ease-in-out",
                                selected
                                  ? "bg-white shadow"
                                  : "hover:bg-white/[0.12] hover:text-blue-800"
                              )
                            }
                          >
                            {({ selected }) => (
                              <>
                                <p className="">{subCategory.name}</p>
                                {selected && (
                                  <div className="flex items-center gap-2 duration-200 ease-in-out">
                                    <EditSubjectCategoryModal
                                      subjectCategory={subCategory}
                                    />
                                    <Modal
                                      viewButton={
                                        <div className="cursor-pointer">
                                          <DeleteIcon
                                            classes={"h-4 w-4 text-red-600"}
                                          />
                                        </div>
                                      }
                                      modalTitle={"Alert !"}
                                      handleSubmit={() =>
                                        deleteSubjectCategory({
                                          subjectId: subject._id,
                                          subCategoryId: subject._id,
                                        })
                                      }
                                      submitBtn={
                                        <div className="flex  capitalize outline-none justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 hover:bg-red-200">
                                          <p className="text-sm font-medium text-red-900">
                                            Remove
                                          </p>
                                        </div>
                                      }
                                    >
                                      <p className="">
                                        Are you sure you want to remove subject
                                        category{" "}
                                        <span className="font-medium">
                                          {subCategory.name}{" "}
                                        </span>{" "}
                                        of subject {subject.name} from the
                                        system?
                                      </p>
                                    </Modal>
                                  </div>
                                )}
                              </>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                      <Tab.Panels className="ms-2 flex flex-grow">
                        {subject.subCategories.map((subCategory, idx) => (
                          <Tab.Panel
                            key={idx}
                            className="outline-none flex flex-col rounded-xl bg-blue-50 p-1 w-full gap-1"
                          >
                            <AddModuleModal subjectCategory={subCategory} />
                            {subCategory.moduleList.map((module) => (
                              <div
                                key={module._id}
                                className="relative w-full rounded-lg py-2 px-4 text-base text-start font-medium leading-5 bg-white shadow flex items-center justify-between"
                              >
                                <p className="text-sm font-medium leading-5">
                                  {module.name}
                                </p>
                                <div className="flex items-center gap-2 duration-200 ease-in-out">
                                  <EditModuleModal module={module} />
                                  <Modal
                                    viewButton={
                                      <div className="cursor-pointer">
                                        <DeleteIcon
                                          classes={"h-4 w-4 text-red-600"}
                                        />
                                      </div>
                                    }
                                    modalTitle={"Alert !"}
                                    handleSubmit={() =>
                                      deleteModule({
                                        subCategoryId: subCategory._id,
                                        moduleId: module._id,
                                      })
                                    }
                                    submitBtn={
                                      <div className="flex  capitalize outline-none justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 hover:bg-red-200">
                                        <p className="text-sm font-medium text-red-900">
                                          Remove
                                        </p>
                                      </div>
                                    }
                                  >
                                    <p className="">
                                      Are you sure you want to remove module{" "}
                                      <span className="font-medium">
                                        {module.name}{" "}
                                      </span>{" "}
                                      of subject category {subCategory.name}{" "}
                                      from the system?
                                    </p>
                                  </Modal>
                                </div>
                              </div>
                            ))}
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
