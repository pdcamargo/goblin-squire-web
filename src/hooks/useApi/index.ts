/* eslint-disable @typescript-eslint/indent */
import useSWR from 'swr';

import { api } from '~/config';

import { UseApiResponseType } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useApi<DataT = any, ErrorT = any>(
  url: string
): UseApiResponseType<DataT, ErrorT> {
  const { data, error, mutate, isValidating, revalidate } = useSWR<
    DataT,
    ErrorT
  >(url, async (uri: string) => {
    const response = await api.get(uri);

    return response.data;
  });

  return { data, error, mutate, revalidate, isValidating };
}
