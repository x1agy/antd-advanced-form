import { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

interface AxiosBaseQueryArgs {
  method?: Method;
  url: string;
  body?: unknown;
  params?: Record<string, (string | number | undefined | null) | (string | number | undefined | null)[]>;
  headers?: AxiosRequestConfig['headers'];
}

type AxiosBaseQuery = BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosError<unknown>>;

export const apiClient = axios.create({ baseURL: '/commonTask' });

export const createApiBaseQuery =
  (basePath = ''): AxiosBaseQuery =>
  ({ url, body, method, params, headers }, { signal, type }) => {
    const requestUrl = [basePath, url].map((path) => path.replace(/^\\+|\\+$/g, '')).join('');

    return apiClient.request({
      url: requestUrl,
      method: method ?? (type === 'mutation' ? 'post' : 'get'),
      data: body,
      headers: {
        ...headers,
      },
      params,
      signal,
    });
  };