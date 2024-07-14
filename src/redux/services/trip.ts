import { travelYatriApi } from ".";
import { ICreateTripRequest } from "../../contracts/ICreateTripRequest";
import { ITripResponse } from "../../contracts/ICreateTripResponse";
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
    getTrip: builder.query<IGetTripResponse, void>({
      providesTags:[GET_TRIP],
        query: () => {
        return {
          url: "trip",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateTripMutation, useGetTripQuery } = trip;
