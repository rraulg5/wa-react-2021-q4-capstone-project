import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import styled from 'styled-components';
import { Result } from '../interfaces/ProductsResponse';

interface Props {
  product: Result;
}

const HoverLayer = styled.div`
  align-items: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.35);
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
  transition: all 0.5s ease;
  z-index: 3;
`;

const Container = styled.article`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 500px;
  margin: 5px;
  min-width: 400px;
  position: relative;

  &:hover ${HoverLayer} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 80%;
  z-index: 2;
`;

const Info = styled.div`
  align-items: center;
  /* background-color: blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h3`
  font-size: 24px;
`;
const Price = styled.p`
  font-size: 18px;
  margin: 12px 0;
`;
const Category = styled.p`
  font-size: 14px;
  text-decoration: underline;
  text-transform: capitalize;
`;

const Icon = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  margin: 10px;
  width: 40px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #eee;
  }
`;

export const ProductItem: FC<Props> = ({ product }) => {
  return (
    <Container>
      <Image
        src={product.data.mainimage.url}
        alt={product.data.mainimage.alt!}
      />
      <Info>
        <Name>{product.data.name}</Name>
        <Price>$ {product.data.price.toLocaleString()}</Price>
        <Category>{product.data.category.slug}</Category>
      </Info>
      <HoverLayer>
        <Icon>
          <FontAwesomeIcon icon={faSearch} />
        </Icon>
        <Icon>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Icon>
      </HoverLayer>
    </Container>
  );
};
