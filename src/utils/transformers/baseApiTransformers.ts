import { AxiosError } from 'axios';

import {
  AddValueError,
  CommonResponse,
  ContactTypeListResponse,
  CountryListResponse,
} from '@/types';

export const transformCountryListResponse = (response: CommonResponse<CountryListResponse>) => {
  const { data: countryList } = response;
  const transformedValue = countryList.map((country) => ({
    value: country.code,
    label: country.userLabel,
  }));

  return transformedValue;
};

export const transformAddCountryError = (response: AxiosError<AddValueError>) => {
  const value = response.response?.data.field;
  return value as string;
};

export const transformContactTypeListResponse = (response: ContactTypeListResponse) => {
  const { data: contactTypeList } = response;
  const transformedValue = contactTypeList.map((contact) => ({
    value: contact.code,
    label: contact.userLabel,
  }));

  return transformedValue;
};
