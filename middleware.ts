import { store } from "@/store";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./utils/enums";

// const userDetails = store.getState().auth.userDetails;

const protectedRoutes = [
  "/add-question",
  "/add-pdf-papers",
  "/add-question",
  "/edit-question",
  "/lms-settings",
  "/manage-courses",
  "/manage-paper-questions",
  "/manage-papers",
  "/manage-questions",
  "/manage-users",
  "/subscriptions",
];

export default function middleware(req: NextRequest) {
  // if (
  //   !userDetails?.roles.includes(UserRole.ADMIN) &&
  //   protectedRoutes.includes(req.nextUrl.pathname)
  // ) {
  //   const absoluteURL = new URL("/", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}
