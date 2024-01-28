/* eslint-disable no-useless-concat */
import { BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import Cookies from "js-cookie";
import { getAccess } from "./token";

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  roles: ("USER" | "MODERATOR" | "ADMIN")[];
  _id: string;
}

export const getUserDetails = (): UserDetails | null => {
  const userDetails = Cookies.get("userDetails");
  if (userDetails) {
    const userDetailsObj = JSON.parse(userDetails);
    return userDetailsObj;
  } else {
    return null;
  }
};

const domain = typeof window !== "undefined" ? window.location.hostname : "";

export const setUserDetails = (userObject: UserDetails) => {
  const userDetailsObj = JSON.stringify(userObject);
  Cookies.set("userDetails", userDetailsObj, {
    path: "/",
    domain,
    // expires: 1 / 48, // 30 mins
  });
};

export const clearUserDetails = () => {
  Cookies.remove("userDetails", {
    path: "/",
    domain,
  });
};

export const getUserID = (): string | null => {
  const userDetails = Cookies.get("userDetails");
  if (userDetails) {
    const userDetailsObj: UserDetails = JSON.parse(userDetails);
    return userDetailsObj._id;
  } else {
    return null;
  }
};

export const getUser = () => {
  const userDetails = getUserDetails();

  if (!userDetails) {
    const axiosConfig = {
      method: "GET",
      url: `${BASE_URL}auth/user-details`,
      headers: {
        Authorization: `Bearer ${getAccess()}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
