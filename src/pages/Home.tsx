import { Slider } from '../components/Slider';
import { Categories } from '../components/Categories';
import { ProductList } from '../components/ProductList';
import styled from 'styled-components';
import { FC } from 'react';

import productsMock from '../mocks/en-us/featured-products.json';

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #222;
  border: none;
  border-radius: 1em;
  color: #fff;
  cursor: pointer;
  font-size: 1.1em;
  padding: 1em 2em;
`;

interface Props {
  showHomepage: (showHome: boolean) => void;
}

export const Home: FC<Props> = ({ showHomepage }) => {
  return (
    <>
      <Slider />
      <Categories />
      <ProductList products={productsMock.results} />
      <ButtonContainer>
        <Button
          onClick={() => {
            showHomepage(false);
          }}
        >
          View all products
        </Button>
      </ButtonContainer>
    </>
  );
};
