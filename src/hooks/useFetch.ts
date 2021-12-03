import { useQuery } from 'react-query';
import { API_BASE_URL } from '../utils/constants';
import { APIResponse } from '../interfaces/APIResponse';
import { APIRefResponse } from '../interfaces/APIRefResponse';

export const useFetch = (fetchKey: string, endpoint: string) => {
  let apiRef = '';
  const { data: apiData } = useQuery<APIRefResponse, Error>(
    'apiRef',
    fetchAPIRef
  );
  if (apiData) {
    apiRef = apiData.refs[0].ref;
  }

  const { data, isLoading } = useQuery<APIResponse, Error>(
    [fetchKey, apiRef, endpoint],
    () => fetchEndpoint(apiRef!, endpoint),
    {
      enabled: !!apiRef,
    }
  );
  return { isLoading, data };
};

const fetchAPIRef = async (): Promise<APIRefResponse> => {
  const res = await fetch(API_BASE_URL);
  if (res.ok) return res.json();

  throw new Error('Error Fetching');
};

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
