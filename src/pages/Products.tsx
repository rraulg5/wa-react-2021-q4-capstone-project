import { useEffect, useState } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ProductList } from '../components/ProductList';
import { mobile } from '../responsive';
import { useLocation } from 'react-router';
import { Loading } from '../components/Loading';
import { Pagination } from '../components/Pagination';
import { useFetch } from '../hooks/useFetch';
import { Category as CategoryI } from '../interfaces/Category';
import { Product } from '../interfaces/Product';

export const Products = () => {
  const query = new URLSearchParams(useLocation().search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [categoryURL] = useState(query.get('category'));
  const [products, setProducts] = useState<Product[]>([]);

  /* Fetching Categories for Sidebar */
  const endPointCategories = `${encodeURIComponent(
    '[[at(document.type, "category")]]'
  )}&lang=en-us&pageSize=30`;

  const { data: dataCategories, isLoading: isLoadingCategories } = useFetch(
    'categories',
    endPointCategories
  );

  /* Fetching Products */
  const endPointProducts = `${encodeURIComponent(
    '[[at(document.type, "product")]]'
  )}&lang=en-us&pageSize=12&page=${page}`;

  const { data: dataProducts, isLoading: isLoadingProducts } = useFetch(
    'products',
    endPointProducts
  );

  useEffect(() => {
    if (dataProducts) {
      setProducts(dataProducts.results);
      setTotalPages(dataProducts.total_pages);
    }
  }, [dataProducts]);

  useEffect(() => {
    if (categoryURL) {
      setFilters([categoryURL]);
    }
  }, [categoryURL]);

  const toogleFilter = (category: string) => {
    if (!filters.includes(category)) {
      setFilters([...filters, category]);
    } else {
      setFilters(filters.filter((c) => c !== category));
    }
  };

  return (
    <Container>
      <Sidebar>
        <h2>Categories</h2>
        {isLoadingCategories ? (
          <Loading />
        ) : (
          <CategoriesWrapper>
            {dataCategories?.results.map((category: CategoryI) => (
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
          <ClearFilters
            onClick={() => {
              setFilters([]);
            }}
          >
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
          </>
        )}
        {totalPages && (
          <Pagination
            pages={Array.from(Array(totalPages + 1).keys())}
            onPageChange={setPage}
          />
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
