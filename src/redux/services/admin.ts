import { travelYatriApi } from ".";
import { IAdminUserQuery } from "../../contracts/IAdminUserQuery";
import { IAdminUserResponse } from "../../contracts/IAdminUserResponse";
import { IVerifyOrganizerRequest } from "../../contracts/IVerifyOrganizerRequest";
import { IVerifyOrganizerResponse } from "../../contracts/IVerifyOrganizerResponse";

export const adminApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IAdminUserResponse, IAdminUserQuery>({
      providesTags: [],
      query: (args) => {
        return {
          url: `user?role=${args?.role}`,
          method: "GET",
        };
      },
    }),
    verifyOrganizer: builder.mutation<
      IVerifyOrganizerResponse,
      IVerifyOrganizerRequest
    >({
      invalidatesTags: [],
      query: (body) => {
        return {
          url: `user/org-verify/${body?.id}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useVerifyOrganizerMutation } = adminApi;
