/* eslint-disable no-useless-concat */
import { BASE_URL } from "@/config/apiConfig";
import axios from "axios";
import Cookies from "js-cookie";

export const getAuthToken = (): string | null => Cookies.get("session") ?? null;
export const getRefreshToken = (): string | null =>
  Cookies.get("refreshToken") ?? null;
const domain = window.location.hostname;

export const setAuthToken = (token: string) =>
  Cookies.set("session", token, {
    path: "/",
    domain,
    expires: 1 / 48, // 1 day
  });
export const setRefreshToken = (refreshToken: string) =>
  Cookies.set("refreshToken", refreshToken, {
    path: "/",
    domain,
    expires: 1, // 1 day
  });

export const clearAuthToken = () => {
  Cookies.remove("session", {
    path: "/",
    domain,
  });
  Cookies.remove("refreshToken", {
    path: "/",
    domain,
  });
};

export const getAccess = () => {
  const authToken = getAuthToken();

  if (!authToken) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      // navigate to unAuthorized page or login page here
      // this point means user not logged in or both tokens expired
    } else {
      const axiosConfig = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        url: `${BASE_URL}auth/refresh-token`,
      };
      axios(axiosConfig)
        .then((response) => {
          setAuthToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          return getAuthToken();
        });
    }
  } else {
    return authToken;
  }
};
