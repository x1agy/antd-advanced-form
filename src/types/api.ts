export interface CommonResponse<TData> {
  data: TData;
  error: Error | null;
}
