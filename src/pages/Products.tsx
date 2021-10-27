import { SyntheticEvent, useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { ProductList } from '../components/ProductList';
import { Result as ResultCategory } from '../interfaces/ProductCategoriesResponse';
import { Result as ResultProduct } from '../interfaces/ProductsResponse';
import { mobile } from '../responsive';

export const Products = () => {
  const categories: ResultCategory[] = [];
  const productsMock: ResultProduct[] = [];
  const paginationMock = Array.from(Array(5).keys());

  const [filters, setFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (e: SyntheticEvent<HTMLSpanElement>) => {
    const category = e.currentTarget.textContent?.toLowerCase()!;

    if (!filters.includes(category)) {
      setFilters([...filters, category]);
      e.currentTarget.style.backgroundColor = '#eee';
    } else {
      const auxArr = filters.filter((c) => c !== category);
      setFilters(auxArr);
      e.currentTarget.style.backgroundColor = '#fff';
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup - componentWillUnmount() equivalent
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Container>
      <Sidebar>
        <h2>Categories</h2>
        <CategoriesWrapper>
          {categories.map((category) => (
            <Category onClick={handleClick} key={category.id}>
              {category.data.name}
            </Category>
          ))}
        </CategoriesWrapper>
      </Sidebar>
      <Main>
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
            <ProductListWrapper>
              {filters.length === 0 ? (
                <ProductList products={productsMock} />
              ) : (
                <ProductList
                  products={productsMock.filter((product) =>
                    filters.includes(product.data.category.slug)
                  )}
                />
              )}
            </ProductListWrapper>
            <PaginationWrapper>
              <Pagination>
                <PaginationItem className="pag-nav">Prev</PaginationItem>
                {paginationMock.map((page) => (
                  <PaginationItem
                    className={page === 0 ? 'current' : ''}
                    key={page}
                  >
                    {page + 1}
                  </PaginationItem>
                ))}
                <PaginationItem className="pag-nav">Next</PaginationItem>
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
