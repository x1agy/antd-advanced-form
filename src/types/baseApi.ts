export type CountryListResponse = { code: string; userLabel: string }[];
export type CountryList = { value: string; label: string }[];

export type ContactTypeListResponse = {
  status: string;
  data: { code: string; userLabel: string }[];
};
export type ContactTypeList = { value: string; label: string }[];

export type AddValue = { code: string; userLabel: string };
export type AddValueError = { field: 'code' | 'userLabel'; message: string; status: string };
