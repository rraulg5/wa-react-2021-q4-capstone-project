import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ProductList } from '../components/ProductList';
import styled from 'styled-components';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import { useFetch } from '../hooks/useFetch';
import { Product } from '../interfaces/Product';

export const Search = () => {
  const query = new URLSearchParams(useLocation().search).get('q');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const endpoint = `${encodeURIComponent(
    '[[at(document.type, "product")]]'
  )}&q=${encodeURIComponent(
    `[[fulltext(document, "${query}")]]`
  )}&lang=en-us&pageSize=20&page=${page}`;

  const { data, isLoading } = useFetch('products', endpoint);

  useEffect(() => {
    if (data) {
      setSearchResults(data.results);
      setTotalPages(data.total_pages);
    }
  }, [data]);

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
        </>
      )}
      {totalPages && (
        <Pagination
          pages={Array.from(Array(totalPages + 1).keys())}
          onPageChange={setPage}
        />
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
