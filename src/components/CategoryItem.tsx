import { FC } from 'react';
import styled from 'styled-components';
import { Result } from '../interfaces/ProductCategoriesResponse';

interface Props {
  category: Result;
}

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 30vh;
  position: relative;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;
const Info = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  transition: all 0.5s ease;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
const Title = styled.h3`
  color: #fff;
`;

export const CategoryItem: FC<Props> = ({ category }) => {
  return (
    <Container>
      <Image
        src={category.data.main_image.url}
        alt={category.data.main_image.alt}
      />
      <Info>
        <Title>{category.data.name}</Title>
      </Info>
    </Container>
  );
};
