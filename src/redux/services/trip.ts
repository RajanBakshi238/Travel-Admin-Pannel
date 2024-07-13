import { travelYatriApi } from ".";
import { ICreateTripRequest } from "../../contracts/ICreateTripRequest";
import { ITripResponse } from "../../contracts/ICreateTripResponse";

export const trip = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createTrip: builder.mutation<ITripResponse, ICreateTripRequest>({
      query: (body) => {
        return {
          url: "trip",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {useCreateTripMutation} = trip
