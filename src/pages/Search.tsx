import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { API_BASE_URL } from '../utils/constants';
import { useLatestAPI } from '../utils/hooks/useLatestAPI';
import { ProductsResponse, Result } from '../interfaces/ProductsResponse';
import { ProductList } from '../components/ProductList';
import styled from 'styled-components';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';

export const Search = () => {
  const { ref: apiRef, isLoading: isLoadingApiRef } = useLatestAPI();
  const [isLoading, setIsLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get('q');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchResults, setSearchResults] = useState<Result[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getSearchResults() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&q=${encodeURIComponent(
            `[[fulltext(document, "${query}")]]`
          )}&lang=en-us&pageSize=20&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        const data: ProductsResponse = await response.json();

        setSearchResults(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    if (!isLoadingApiRef) {
      getSearchResults();
    }

    return () => {
      controller.abort();
    };
  }, [apiRef, isLoadingApiRef, page, query]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Title>Results for "{query}"</Title>

          <ProductListWrapper>
            <ProductList products={searchResults} />
          </ProductListWrapper>

          {totalPages && (
            <Pagination
              pages={Array.from(Array(totalPages + 1).keys())}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ProductListWrapper = styled.div``;

const Title = styled.h2`
  align-items: center;
  display: flex;
  font-size: 2em;
  justify-content: center;
  padding: 1em;
`;
