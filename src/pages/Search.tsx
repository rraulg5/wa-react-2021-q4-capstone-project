import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { API_BASE_URL } from '../utils/constants';
import { useLatestAPI } from '../utils/hooks/useLatestAPI';
import { ProductsResponse, Result } from '../interfaces/ProductsResponse';
import { ProductList } from '../components/ProductList';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { mobile } from '../responsive';

export const Search = () => {
  const { ref: apiRef, isLoading: isLoadingApiRef } = useLatestAPI();
  const [isLoading, setIsLoading] = useState(true);

  const query = new URLSearchParams(useLocation().search).get('q');

  const [pagination, setPagination] = useState<number[]>([]);
  const [page, setPage] = useState(1);

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
        setPagination(Array.from(Array(data.total_pages + 1).keys()));
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

  const handleClickPage = (page: number) => {
    if (page > 0 && page <= pagination.length - 1) {
      setPage(page);
      // history.push(`?page=${page}`);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <Loading>
          <FontAwesomeIcon
            icon={faSpinner}
            spin={true}
            style={{ fontSize: '2em', opacity: 0.7 }}
          />
          <br />
          Loading...
        </Loading>
      ) : (
        <>
          <Title>Results for "{query}"</Title>

          <ProductListWrapper>
            <ProductList products={searchResults} />
          </ProductListWrapper>

          <PaginationWrapper>
            <Pagination>
              <PaginationItem
                className="pag-nav"
                onClick={() => {
                  handleClickPage(page - 1);
                }}
              >
                Prev
              </PaginationItem>
              {pagination.map(
                (pag) =>
                  pag !== 0 && (
                    <PaginationItem
                      className={pag === page ? 'current' : ''}
                      key={pag}
                      onClick={() => {
                        handleClickPage(pag);
                      }}
                    >
                      {pag}
                    </PaginationItem>
                  )
              )}
              <PaginationItem
                className="pag-nav"
                onClick={() => {
                  handleClickPage(page + 1);
                }}
              >
                Next
              </PaginationItem>
            </Pagination>
          </PaginationWrapper>
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

const Loading = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
`;

const ProductListWrapper = styled.div``;

const PaginationWrapper = styled.div`
  padding: 1.5em;
`;

const Pagination = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PaginationItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-weight: 300;

  text-decoration: none;
  border: 2px solid #eee;
  color: #222;
  cursor: pointer;
  border-radius: 0.5em;
  margin: 0 3px;
  min-width: 45px;
  min-height: 45px;

  ${mobile({ display: 'none' })}

  &.pag-nav {
    background-color: #eee;
    padding: 0 1.5em;
  }

  &.current,
  &.pag-nav {
    ${mobile({ display: 'flex' })}
  }

  &.current {
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }
`;

const Title = styled.h2`
  align-items: center;
  display: flex;
  font-size: 2em;
  justify-content: center;
  padding: 1em;
`;
