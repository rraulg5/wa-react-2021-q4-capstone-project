import { useEffect, useState } from 'react';
import { APIResponse } from '../interfaces/APIResponse';
import { API_BASE_URL } from '../utils/constants';

const emptyData = {
  page: 0,
  results_per_page: 0,
  results_size: 0,
  total_results_size: 0,
  total_pages: 0,
  next_page: null,
  prev_page: null,
  results: [],
  version: '',
  license: '',
};

export const useFetch = (queries: string) => {
  const [data, setData] = useState<APIResponse>(emptyData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('fetching');
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const responseLatestAPI = await fetch(API_BASE_URL, {
          signal: controller.signal,
        });
        const { refs } = await responseLatestAPI.json();
        const { ref: apiRef } = refs[0];

        const responseData = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&${queries}`,
          {
            signal: controller.signal,
          }
        );
        const data: APIResponse = await responseData.json();
        console.log(data.results);

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [queries]);

  return { data, isLoading };
};
