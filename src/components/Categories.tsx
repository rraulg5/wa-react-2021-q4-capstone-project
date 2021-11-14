import styled from 'styled-components';
import { CategoryItem } from './CategoryItem';
import { mobile } from '../responsive';
import { useFetch } from '../hooks/useFetch';
import { Category } from '../interfaces/Category';
import { Loading } from './Loading';

export const Categories = () => {
  const endPoint = `${encodeURIComponent(
    '[[at(document.type, "category")]]'
  )}&lang=en-us&pageSize=30`;

  const { data, isLoading } = useFetch('categories', endPoint);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        data?.results.map((category: Category) => (
          <CategoryItem category={category} key={category.id} />
        ))
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  ${mobile({ flexDirection: 'column', padding: 0 })}
`;
