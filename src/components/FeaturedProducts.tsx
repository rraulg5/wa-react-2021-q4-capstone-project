import { useFetch } from '../hooks/useFetch';
import { Loading } from './Loading';
import { Product } from '../interfaces/Product';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { ProductList } from './ProductList';
import { useEffect, useState } from 'react';

export const FeaturedProducts = () => {
  const endPoint = `${encodeURIComponent(
    '[[at(document.type, "product")]]'
  )}&q=${encodeURIComponent(
    '[[at(document.tags, ["Featured"])]]'
  )}&lang=en-us&pageSize=16`;

  const { data, isLoading } = useFetch('featuredProducts', endPoint);

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setFeaturedProducts(data.results);
    }
  }, [data]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProductListWrapper>
            <ProductList products={featuredProducts} />
          </ProductListWrapper>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductListWrapper = styled.div``;
