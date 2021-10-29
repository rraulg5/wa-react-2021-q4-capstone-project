import { useEffect, useState } from 'react';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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

export const Products = () => {
  const { ref: apiRef, isLoading: isLoadingApiRef } = useLatestAPI();

  const query = new URLSearchParams(useLocation().search);
  const [categoryURL] = useState(query.get('category'));
  // const history = useHistory();
  const [pagination, setPagination] = useState<number[]>([]);
  // const [page, setPage] = useState(Number(query.get('page')) || 1);
  const [page, setPage] = useState(1);

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
        setPagination(Array.from(Array(data.total_pages + 1).keys()));
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

  const handleClickPage = (page: number) => {
    if (page > 0 && page <= pagination.length - 1) {
      setPage(page);
      // history.push(`?page=${page}`);
    }
  };

  return (
    <Container>
      <Sidebar>
        <h2>Categories</h2>
        {isLoadingCategories ? (
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
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Loading = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
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
