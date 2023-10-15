/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/user/profile",
    }),
    loginuser: builder.mutation({
      query: (data) => ({
        url: "/auth/signin/",
        method: "POST",
        body: data,
      }),
    }),
    signupuser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLoginuserMutation, useSignupuserMutation } =
  userApi;
