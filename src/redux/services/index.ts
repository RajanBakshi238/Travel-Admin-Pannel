// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRAVEL_YATRI_REDUCER_KEY } from "../reduxResourceTags";
import { ILoginWithGoogleResponse } from "../../contracts/ILoginWithGoogleResponse";
import { ILoginWithGoogleRequest } from "../../contracts/ILoginWithGoogleResquest";
import { RootState } from "../store";

export const travelYatriApi = createApi({
  reducerPath: TRAVEL_YATRI_REDUCER_KEY,
  //   tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3005/api/v1/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authenticated;
      if (token) {
        headers.set("authorization", `Bearer ${token.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    loginWithGoogle: builder.mutation<
      ILoginWithGoogleResponse,
      ILoginWithGoogleRequest
    >({
      query: (body) => {
        return {
          url: "auth/google-login",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginWithGoogleMutation } = travelYatriApi;
