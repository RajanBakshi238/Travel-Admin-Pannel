import { travelYatriApi } from ".";
import { IAdminUserQuery } from "../../contracts/IAdminUserQuery";
import { IAdminUserResponse } from "../../contracts/IAdminUserResponse";

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
  }),
});

export const { useGetUsersQuery } = adminApi;
