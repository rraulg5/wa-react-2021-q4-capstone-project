import { useState, useEffect } from 'react';
import {
  FeauturedBannersResponse,
  FeauturedBannersState,
} from '../../interfaces/FeaturedBannersResponse';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

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

const initState: FeauturedBannersState = {
  data: emptyData,
  isLoading: true,
};

export function useFeaturedBanners() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [featuredBanners, setFeaturedBanners] = useState(() => initState);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        setFeaturedBanners({ data: emptyData, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "banner")]]'
          )}&lang=en-us&pageSize=5`,
          {
            signal: controller.signal,
          }
        );
        const data: FeauturedBannersResponse = await response.json();

        setFeaturedBanners({ data, isLoading: false });
      } catch (err) {
        setFeaturedBanners({ data: emptyData, isLoading: false });
        console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return featuredBanners;
}
