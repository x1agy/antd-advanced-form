import { createApiBaseQuery } from './../../core/axiosConfig';
import { createApi } from "@reduxjs/toolkit/query/react";


  interface CommonResponse<TData> {
    data: TData;
    error: Error | null;
  }

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: createApiBaseQuery(),
  tagTypes: ['baseTag'],
  endpoints: (builder) => ({
    getCountryList: builder.query<string[], void>({
      query: () => ({
        url: 'ant-forms/country/list',
      }),
      transformResponse: (response: CommonResponse<string[]>) => response.data
    })
  })
})

export const {useGetCountryListQuery} = baseApi;

