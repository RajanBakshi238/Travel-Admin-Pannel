// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TRAVEL_YATRI_REDUCER_KEY } from "../reduxResourceTags";
import { ILoginWithGoogleResponse } from "../../contracts/ILoginWithGoogleResponse";
import { ILoginWithGoogleRequest } from "../../contracts/ILoginWithGoogleResquest";
import { RootState } from "../store";
import { UPDATE_ME } from "../travelYatriApiTags";

export const travelYatriApi = createApi({
  reducerPath: TRAVEL_YATRI_REDUCER_KEY,
  tagTypes: [UPDATE_ME],
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
      invalidatesTags: [UPDATE_ME],
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
