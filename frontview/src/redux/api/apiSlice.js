import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

// Define a base query with optional headers for token authorization
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create an API slice with baseQuery and placeholders for endpoints
export const apiSlice = createApi({
  reducerPath: "api", // Optional: Customize the reducer path if needed
  baseQuery,
  endpoints: (builder) => ({
    // Example placeholder for an endpoint
    exampleEndpoint: builder.query({
      query: () => "/example",
    }),
  }),
});

export const { useExampleEndpointQuery } = apiSlice; // Export hooks for the example endpoint
