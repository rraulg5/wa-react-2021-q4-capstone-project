import { useState, useEffect } from 'react';
import {
  ProductCategoriesState,
  ProductCategoriesResponse,
} from '../../interfaces/ProductCategoriesResponse';
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

const initState: ProductCategoriesState = {
  data: emptyData,
  isLoading: true,
};

export function useCategories() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [categories, setCategories] = useState(() => initState);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        setCategories({ data: emptyData, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "category")]]'
          )}&lang=en-us&pageSize=30`,
          {
            signal: controller.signal,
          }
        );
        const data: ProductCategoriesResponse = await response.json();

        setCategories({ data, isLoading: false });
      } catch (err) {
        setCategories({ data: emptyData, isLoading: false });
        console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return categories;
}
