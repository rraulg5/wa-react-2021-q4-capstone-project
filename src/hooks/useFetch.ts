import { useQuery } from 'react-query';
import { API_BASE_URL } from '../utils/constants';
import { useLatestAPI } from '../utils/hooks/useLatestAPI';
import { APIResponse } from '../interfaces/APIResponse';

const fetchEndpoint = async (
  apiRef: string,
  endpoint: string
): Promise<APIResponse> => {
  const res = await fetch(
    `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${endpoint}`
  );
  if (res.ok) return res.json();

  throw new Error('Error Fetching');
};

export const useFetch = (fetchKey: string, endpoint: string) => {
  const { ref: apiRef } = useLatestAPI();

  const { data, isLoading } = useQuery<APIResponse, Error>(
    [fetchKey, apiRef, endpoint],
    () => fetchEndpoint(apiRef!, endpoint),
    {
      enabled: !!apiRef,
    }
  );
  return { isLoading, data };
};
