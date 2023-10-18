import { api } from "@/redux/api/apiSlice";

const cartapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getcart: builder.query({
      query: () => `/cart`,
      providesTags: ["cart"],
    }),
    addcart: builder.mutation({
      query: (data: any) => ({
        url: `/cart`,
        method: "POST",
        body: {
          serviceId: data,
        },
      }),
      invalidatesTags: ["cart"],
    }),
    updatecart: builder.mutation({
      query: (data: any) => ({
        url: `/cart`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["cart","notification"],
    }),
    deletecart: builder.mutation({
      query: (id: any) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetcartQuery,
  useAddcartMutation,
  useUpdatecartMutation,
  useDeletecartMutation,
} = cartapi;
