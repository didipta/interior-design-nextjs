import { api } from "@/redux/api/apiSlice";

const Service = api.injectEndpoints({
  endpoints: (builder) => ({
    getservice: builder.query({
      query: (data: any) =>
        `/service?page=${data.page}&searchTerm=${data.search}&sortBy=${data.sortby}&sortOrder=desc`,
      providesTags: ["service"],
    }),
    getservicebyid: builder.query({
      query: (id: any) => `/service/${id}`,
      providesTags: ["service"],
    }),
  }),
});

export const { useGetserviceQuery, useGetservicebyidQuery } = Service;
