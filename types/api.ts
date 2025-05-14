export type APIResponseType<DataType> =
  | {
      message: string;
    }
  | { data: DataType };
