"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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




export default function AddPDFPapers() {
  

  return (
    <>

    

    </>
  );
}
