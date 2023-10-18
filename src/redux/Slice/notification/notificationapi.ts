import { api } from "@/redux/api/apiSlice";

const notification = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => "/notification",
      providesTags: ["notification"],
    }),
    putnotification: builder.mutation({
      query: () => ({
        url: "/notification",
        method: "PUT",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetNotificationQuery, usePutnotificationMutation } =
  notification;
