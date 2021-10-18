import styled from 'styled-components';
import productCategoriesMock from '../mocks/en-us/product-categories.json';
import { Result } from '../interfaces/ProductCategoriesResponse';
import { CategoryItem } from './CategoryItem';
import { mobile } from '../responsive';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  ${mobile({ flexDirection: 'column', padding: 0 })}
`;

export const Categories = () => {
  const categories: Result[] = productCategoriesMock.results;
  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </Container>
  );
};
