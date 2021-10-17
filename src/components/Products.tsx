import styled from 'styled-components';
import productsMock from '../mocks/en-us/featured-products.json';
import { Result } from '../interfaces/ProductsResponse';
import { ProductItem } from './ProductItem';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

export const Products = () => {
  const products: Result[] = productsMock.results;
  return (
    <Container>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </Container>
  );
};
