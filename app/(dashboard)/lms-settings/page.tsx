"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import PaginationComponent from "@/components/pagination";
import Modal from "@/components/modal";
import EntriesPerPage from "@/components/pagination/EntriesPerPage";
import { entriesArray } from "@/components/pagination/entriesArray";

import SectionTitle from "@/components/sectionTitle";
import { table } from "@/variants/table";

import {
  EyeOpenIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/icons";

import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";
import { UrlSlugType } from "@/utils/enums/UrlSlug";

import { Question } from "@/types";
import { form } from "@/variants/form";

import {
  Formik,
  Field,
  ErrorMessage,
  FormikValues,
  FormikHelpers,
} from "formik";

interface FormValues {
  driveLink: string;
  batch: string;
  deleteText: string;
  newBatch: string;
}

const validationSchema = Yup.object({
  newBatch: Yup.string().required("Required"),
  deleteText: Yup.string(),
});

export default function AddPDFPapers() {

  
  const [loading, setLoading] = useState<boolean>(false);
  const [driveLink, setdriveLink] = useState<string>("");
  const [batch, setBatch] = useState<string>("");

  
  const [initialValues, setInitialValues] = useState<FormValues>({
    driveLink: "Loading",
    batch: "Loading",
    deleteText: "",
    newBatch: "",
  });

  

  useEffect(() => {
    const getSettings = async () => {
      setLoading(true);
      const axiosConfig = {
        method: "GET",
        url: `${BASE_URL}lms/settings/admin`,
        headers: {
          Authorization: `Bearer ${getAccess()}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setdriveLink(response.data.driveLink);
          setBatch(response.data.batch);
          
        })
        .catch((err) => {
          
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getSettings();
    
  }, []);


  useEffect(() => {
    // Update initial values once data is fetched
    setInitialValues(prevValues => ({
      ...prevValues,
      driveLink: driveLink,
      batch: batch,
      
    }));
    console.log(initialValues.driveLink)
  }, [driveLink, batch, ]);


  const changeLMSSettings = (values: FormValues) => {
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}lms/settings`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        driveLink: values.driveLink,
        batch: values.batch,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Settings Updated");
        } else {
          alert("Unexpected status code: " + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const deleteALL = (values: FormValues) => {
    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}lms/delete-all`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
      data: {
        newBatch: values.newBatch,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("Deleted");
        } else {
          alert("Unexpected status code: " + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <SectionTitle title="LMS Settings" />
      </div>

      <div className="mt-5 flex gap-3">
        <div className="w-1/2 bg-white p-10 rounded-md">
        
  <Formik initialValues={initialValues} enableReinitialize onSubmit={changeLMSSettings}>
    {({ isSubmitting, errors, handleSubmit, touched, values }) => (
      <form onSubmit={handleSubmit} className={form().innerForm()}>
        <div className={form().formDiv()}>
          <label htmlFor="driveLink" className={form().label()}>
            Drive Link
          </label>
          <Field
            name="driveLink"
            type="text"
            className={form().input()}
          />
        </div>

        <div className={form().formDiv()}>
          <label htmlFor="batch" className={form().label()}>
            SMIT Batch
          </label>
          <Field 
            name="batch" 
            type="text" 
            className={form().input()} 
          />
        </div>

        <button
          type="submit"
          className={form().button()}
        >
          <p className="">Update Settings</p>
        </button>
      </form>
    )}
  </Formik>

        </div>

        <div className="w-1/2 bg-white p-10 rounded-md">
          <h3 className="font-bold">Instructions</h3>
          <ul>
            Add the drive downloadable papers folder shareing link as the drive
            link.
          </ul>
          <ul></ul>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <div className="w-1/2 bg-red-100 p-10 rounded-md">
          <h1 className="text-xl text-center text-red-500 p-5 font-black">
            DELETE ALL DATA
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={deleteALL}
          >
            {({ isSubmitting, isValid, errors, touched, values }) => (
              <form>
                <div className={form().formDiv()}>
                  <label
                    htmlFor="newBatch"
                    className={`${form().label()} font-bold mt-5`}
                  >
                    SMIT New Batch*
                    <p className="p-3 font-medium pl-0 pt-0">
                      You need to assign a new batch before delete the exiting
                      one
                    </p>
                  </label>
                  <Field
                    name="newBatch"
                    type="text"
                    className={form().input()}
                  />
                </div>

                {/* New input field for delete text */}
                <div className={form().formDiv()}>
                  <label
                    htmlFor="deleteText"
                    className={`${form().label()} font-bold mt-5`}
                  >
                    Delete ALL data of current batch such as papers, notes,
                    users and their marks*
                    <p className="p-3 font-medium pl-0 pt-0">
                      Type 'DELETE ALL DaTa'{" "}
                    </p>
                  </label>
                  <Field
                    name="deleteText"
                    type="text"
                    className={form().input()}
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isValid ||
                    values.deleteText !== "DELETE ALL DaTa"
                  }
                  className={`${form().button()} ${
                    values.deleteText === "DELETE ALL DaTa" ? "bg-red-500" : ""
                  }`}
                >
                  <p className="">DELETE ALL</p>
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
