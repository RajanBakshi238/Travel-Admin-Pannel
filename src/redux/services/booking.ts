import { travelYatriApi } from ".";
import { IBookingResponse } from "../../contracts/IBookingResponse";
import { ICreateBookingRequest } from "../../contracts/ICreateBookingRequest";
import { IEvaluateBookingRequest } from "../../contracts/IEvaluateBookingRequest";
import { IEvaluateBookingResponse } from "../../contracts/IEvaluateBookingResponse";

export const booking = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<IBookingResponse, ICreateBookingRequest>({
      query: (body) => {
        return {
          url: "booking",
          method: "POST",
          body,
        };
      },
    }),
    evaluateBooking: builder.mutation<
      IEvaluateBookingResponse,
      IEvaluateBookingRequest
    >({
      query: (body) => {
        return {
          url: "booking/evaluate",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useCreateBookingMutation, useEvaluateBookingMutation } = booking;
