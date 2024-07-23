import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';

import { AddValue, CommonResponse, ContactTypeList, CountryList } from '@/types';
import { transformContactTypeListResponse, transformCountryListResponse } from '@/utils';

import { createApiBaseQuery } from './../../core';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: createApiBaseQuery(),
  tagTypes: ['countryTag', 'contactTypeTag'],
  endpoints: (builder) => ({
    getCountryList: builder.query<CountryList, void>({
      query: () => ({
        url: 'country/list',
      }),
      providesTags: ['countryTag'],
      transformResponse: transformCountryListResponse,
    }),
    addCountry: builder.mutation<CommonResponse<CountryList>, AddValue>({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        try {
          const res = (await baseQuery({
            url: 'country',
            method: 'POST',
            body,
          })) as unknown as CommonResponse<CountryList>;
          return { data: res };
        } catch (error) {
          return { error: error as AxiosError };
        }
      },
      invalidatesTags: ['countryTag'],
    }),
    getContactTypeList: builder.query<ContactTypeList, void>({
      query: () => ({
        url: 'contact-type/list',
      }),
      transformResponse: transformContactTypeListResponse,
      providesTags: ['contactTypeTag'],
    }),
    addContactType: builder.mutation<CommonResponse<ContactTypeList>, AddValue>({
      queryFn: async (body, _api, _extraOptions, baseQuery) => {
        try {
          const res = (await baseQuery({
            url: 'contact-type',
            method: 'POST',
            body,
          })) as unknown as CommonResponse<ContactTypeList>;
          return { data: res };
        } catch (error) {
          return { error: error as AxiosError };
        }
      },
      invalidatesTags: ['contactTypeTag'],
    }),
  }),
});

export const {
  useGetCountryListQuery,
  useAddCountryMutation,
  useGetContactTypeListQuery,
  useAddContactTypeMutation,
} = baseApi;
