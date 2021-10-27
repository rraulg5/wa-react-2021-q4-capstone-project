import styled from 'styled-components';
import {
  Result,
  ProductCategoriesState,
} from '../interfaces/ProductCategoriesResponse';
import { CategoryItem } from './CategoryItem';
import { mobile } from '../responsive';
import { useState, useEffect } from 'react';
import { useCategories } from '../utils/hooks/useCategories';

export const Categories = () => {
  const { data, isLoading }: ProductCategoriesState = useCategories();
  const [categories, setCategories] = useState<Result[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setCategories(data.results);
    }
  }, [data, isLoading]);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  ${mobile({ flexDirection: 'column', padding: 0 })}
`;
