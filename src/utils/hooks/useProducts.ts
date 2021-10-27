import { useState, useEffect } from 'react';
import {
  ProductsState,
  ProductsResponse,
} from '../../interfaces/ProductsResponse';
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

const initState: ProductsState = {
  data: emptyData,
  isLoading: true,
};

export function useProducts() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [products, setProducts] = useState(() => initState);

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getFeaturedBanners() {
      try {
        setProducts({ data: emptyData, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&lang=en-us&pageSize=16`,
          {
            signal: controller.signal,
          }
        );
        const data: ProductsResponse = await response.json();

        setProducts({ data, isLoading: false });
      } catch (err) {
        setProducts({ data: emptyData, isLoading: false });
        console.error(err);
      }
    }

    getFeaturedBanners();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return products;
}
