/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from '../../api/apiSlice'

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/users/',
        }),
        loginuser: builder.mutation({
            query: (data) => ({
                url: '/users/login/',
                method: 'POST',
                body: data,
            }),
        }),
        signupuser: builder.mutation({
            query: (data) => ({
                url: '/users/signup/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useGetUserQuery, useLoginuserMutation, useSignupuserMutation } =
    userApi
