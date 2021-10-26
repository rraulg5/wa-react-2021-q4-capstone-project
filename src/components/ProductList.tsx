import styled from 'styled-components';
import { Result } from '../interfaces/ProductsResponse';
import { ProductItem } from './ProductItem';
import { FC } from 'react';

interface Props {
  products: Result[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Container>
      {products.length === 0 && (
        <NoProductsMsg>
          <p>No products were found matching your selection</p>
        </NoProductsMsg>
      )}
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

const NoProductsMsg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5em;

  height: 300px;
  text-align: center;
`;
