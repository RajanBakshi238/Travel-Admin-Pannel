import { travelYatriApi } from ".";
import { IOrganizerDetailFormRequest } from "../../contracts/IOrganizerDetailFormRequest";
import { IOrganizerDetailFormResponse } from "../../contracts/IOrganizerDetailFormResponse";

export const organizerApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    organizerForm: builder.mutation<
      IOrganizerDetailFormResponse,
      IOrganizerDetailFormRequest
    >({
      invalidatesTags: [],
      query: (body) => {
        return {
          url: "user/org-verify-submit",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useOrganizerFormMutation } = organizerApi;
