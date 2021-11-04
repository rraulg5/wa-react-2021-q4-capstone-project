import { useEffect, useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { ProductList } from '../components/ProductList';
import {
  ProductCategoriesState,
  Result as ResultCategory,
} from '../interfaces/ProductCategoriesResponse';
import { Result as ResultProduct } from '../interfaces/ProductsResponse';
import { mobile } from '../responsive';
import { useCategories } from '../utils/hooks/useCategories';
import { API_BASE_URL } from '../utils/constants';
import { useLatestAPI } from '../utils/hooks/useLatestAPI';
import { ProductsResponse } from '../interfaces/ProductsResponse';
import { useLocation } from 'react-router';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';

export const Products = () => {
  const { ref: apiRef, isLoading: isLoadingApiRef } = useLatestAPI();

  const query = new URLSearchParams(useLocation().search);
  const [categoryURL] = useState(query.get('category'));
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);

  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
  }: ProductCategoriesState = useCategories();
  const [categories, setCategories] = useState<ResultCategory[]>([]);

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState<ResultProduct[]>([]);

  useEffect(() => {
    if (!isLoadingCategories) {
      setCategories(dataCategories.results);
    }
  }, [dataCategories, isLoadingCategories]);

  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
            '[[at(document.type, "product")]]'
          )}&lang=en-us&pageSize=12&page=${page}`,
          {
            signal: controller.signal,
          }
        );
        const data: ProductsResponse = await response.json();

        setProducts(data.results);
        setTotalPages(data.total_pages);
        setIsLoadingProducts(false);
      } catch (err) {
        setProducts([]);
        console.error(err);
      }
    }

    if (!isLoadingApiRef) {
      getProducts();
    }

    return () => {
      controller.abort();
    };
  }, [apiRef, isLoadingApiRef, page]);

  useEffect(() => {
    if (categoryURL) {
      setFilters([categoryURL]);
    }
  }, [categoryURL, categories]);

  const toogleFilter = (category: string) => {
    if (!filters.includes(category)) {
      setFilters([...filters, category]);
    } else {
      setFilters(filters.filter((c) => c !== category));
    }
  };

  const clearFilters = () => {
    setFilters([]);
  };

  return (
    <Container>
      <Sidebar>
        <h2>Categories</h2>
        {isLoadingCategories ? (
          <Loading />
        ) : (
          <CategoriesWrapper>
            {categories.map((category) => (
              <Category
                onClick={() => {
                  toogleFilter(category.slugs[0]);
                }}
                key={category.id}
                className={filters.includes(category.slugs[0]) ? 'active' : ''}
              >
                {category.data.name}
              </Category>
            ))}
          </CategoriesWrapper>
        )}
        {filters.length > 0 && (
          <ClearFilters onClick={clearFilters}>
            Clear filters <FontAwesomeIcon icon={faTimesCircle} />
          </ClearFilters>
        )}
      </Sidebar>
      <Main>
        {isLoadingProducts ? (
          <Loading />
        ) : (
          <>
            <ProductListWrapper>
              {filters.length === 0 ? (
                <ProductList products={products} />
              ) : (
                <ProductList
                  products={products.filter((product) =>
                    filters.includes(product.data.category.slug)
                  )}
                />
              )}
            </ProductListWrapper>
            {totalPages && (
              <Pagination
                pages={Array.from(Array(totalPages + 1).keys())}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Main = styled.div`
  flex: 4;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0;
`;

const Category = styled.span`
  background-color: #fff;
  border: 3px solid #eee;
  border-radius: 1em;
  color: #222;
  cursor: pointer;
  font-size: 1.2em;
  margin: 0.45em;
  padding: 0.5em;

  &.active {
    background-color: #eee;
  }
`;

const ClearFilters = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const Sidebar = styled.div`
  flex: 1;
  text-align: center;
  padding: 3em 0;
  ${mobile({ padding: '0.5em 2em' })}
`;

const ProductListWrapper = styled.div``;
