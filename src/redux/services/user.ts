import { travelYatriApi } from ".";
import { IMeResponse } from "../../contracts/IMeResponse";

export const userApi = travelYatriApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<IMeResponse, void>({
      providesTags: [],
      query: () => {
        return {
          url: "auth/me",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;

export default userApi;
