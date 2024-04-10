import axios, { AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserDetails } from "@/types";
import { BASE_URL } from "@/config/apiConfig";
import { getAccess } from "@/helpers/token";

export interface IAuthState {
  userDetails: UserDetails | undefined;
}

export const fetchUserDetails = createAsyncThunk("auth/userDetails", () => {
  const axiosConfig = {
    method: "GET",
    url: `${BASE_URL}auth/user-details`,
    headers: {
      Authorization: `Bearer ${getAccess()}`,
    },
  };

  const res = axios(axiosConfig)
    .then((response: AxiosResponse<UserDetails>) => response.data)
    .catch((err) => {
      throw err;
    });
  return res;
});

const initialState: IAuthState = {
  userDetails: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      // state.loading = true;
      // state.error = undefined;
    });
    builder.addCase(
      fetchUserDetails.fulfilled,
      (state, action: PayloadAction<UserDetails>) => {
        // state.loading = false;
        state.userDetails = action.payload;
      }
    );
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      // state.loading = false;
      state.userDetails = undefined;
      // state.error = action.error.message;
    });
  },
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = undefined;
    },
  },
});

export const { setUserDetails, clearUserDetails } = authSlice.actions;
export const authReducer = authSlice.reducer;
