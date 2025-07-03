import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l2-assignment-03.vercel.app/api",
  }),
  tagTypes: ["borrow"],
  endpoints: (builder) => ({
    getBorrow: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    createBorrow: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow"],
    }),
  }),
});

export const { useGetBorrowQuery, useCreateBorrowMutation } = borrowApi;
