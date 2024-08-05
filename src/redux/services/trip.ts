import { travelYatriApi } from ".";
import { ICommonRequest } from "../../contracts/ICommonRequest";
import { ICommonResponse } from "../../contracts/ICommonResponse";
import { ICreateTripRequest } from "../../contracts/ICreateTripRequest";
import { ITripResponse } from "../../contracts/ICreateTripResponse";
import { IGetTripQuery } from "../../contracts/IGetTripQuery";
import { IGetTripResponse } from "../../contracts/IGetTripResponse";
import { GET_TRIP } from "../travelYatriApiTags";

export const trip = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrip: builder.mutation<ITripResponse, ICreateTripRequest>({
      invalidatesTags: [GET_TRIP],
      query: (body) => {
        return {
          url: "trip",
          method: "POST",
          body,
        };
      },
    }),
    getTrip: builder.query<IGetTripResponse[], IGetTripQuery>({
      providesTags: [GET_TRIP],
      query: (query) => {
        return {
          url: `trip?place=${query?.place ?? ""}`,
          method: "GET",
        };
      },
    }),
    deleteTrip: builder.mutation<ICommonResponse, ICommonRequest>({
      invalidatesTags: [GET_TRIP],
      query: (args) => {
        return {
          url: `trip/${args?.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useCreateTripMutation, useGetTripQuery, useDeleteTripMutation } = trip;
