import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5173';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Product'], // Tag for caching/invalidation
  
  endpoints: (builder) => ({
    // ------------------- QUERIES -------------------
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Product'], 
    }),
    
    getUsers: builder.query({ // Used for mock login
      query: () => '/users',
    }),

    // ------------------- MUTATIONS -------------------
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      // Invalidating the 'Product' tag forces getProducts to re-fetch
      invalidatesTags: ['Product'], 
    }),

    orderProduct: builder.mutation({
      query: ({ id, newStock }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: { stock: newStock }, // Only update the stock field
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetUsersQuery,
  useUpdateProductMutation,
  useOrderProductMutation,
} = apiSlice;