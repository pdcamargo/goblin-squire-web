import { mutateCallback } from 'swr/dist/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseApiResponseType<DataT = any, ErrorT = any> = {
  data: DataT;
  isValidating: boolean;
  mutate: (
    data?: DataT | Promise<DataT> | mutateCallback<DataT>,
    shouldRevalidate?: boolean
  ) => Promise<DataT>;
  revalidate: () => Promise<boolean>;
  error: ErrorT;
};
