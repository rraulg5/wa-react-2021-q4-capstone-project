import { Slider } from '../components/Slider';
import { Categories } from '../components/Categories';
import { ProductList } from '../components/ProductList';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ProductsState, Result } from '../interfaces/ProductsResponse';
import { useProducts } from '../utils/hooks/useProducts';

export const Home = () => {
  const { data, isLoading }: ProductsState = useProducts();
  const [products, setProducts] = useState<Result[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setProducts(data.results);
    }
  }, [data, isLoading]);

  return (
    <>
      <Slider />
      <Categories />
      <ProductList products={products} />
      <ButtonContainer>
        <Button>View all products</Button>
      </ButtonContainer>
    </>
  );
};

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
