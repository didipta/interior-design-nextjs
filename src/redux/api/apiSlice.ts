import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      // Modify the headers as needed
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["service", "cart", "notification"],
  endpoints: () => ({}),
});
