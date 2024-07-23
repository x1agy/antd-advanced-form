import { BaseQueryFn } from '@reduxjs/toolkit/query';

export const customAddCountryQuery = {
  queryFn: async (body, _api, _extraOptions, baseQuery): Promise<BaseQueryFn> => {
    try {
      const res = (await baseQuery({
        url: endpoints.cryptoTransaction,
        method: 'GET',
        params: {
          currency,
          transaction_id: transactionId,
        },
      })) as unknown as CommonResponse;
      return {
        data: {
          data: res.data,
        },
      };
    } catch (error) {
      return { error: error as AxiosError };
    }
  },
};
