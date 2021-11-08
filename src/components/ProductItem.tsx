import {
  faChevronRight,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../context/CartProvider';
import { Result } from '../interfaces/ProductsResponse';
import { mobile } from '../responsive';

interface Props {
  product: Result;
}

export const ProductItem: FC<Props> = ({ product }) => {
  const { handleAddToCart } = useContext(CartContext);

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
        <HoverLayerWrapper>
          <ShortDesc>{product.data.short_description}</ShortDesc>
          <HoverLayerIcons>
            <Icon to={`/product/${product.id}`}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Icon>
            <Icon to="#">
              <FontAwesomeIcon
                onClick={() => {
                  handleAddToCart(product?.data, 1);
                }}
                icon={faShoppingCart}
              />
            </Icon>
          </HoverLayerIcons>
        </HoverLayerWrapper>
      </HoverLayer>
    </Container>
  );
};

const HoverLayer = styled.div`
  align-items: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
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
  height: 600px;
  margin: 5px;
  min-width: 400px;
  position: relative;

  &:hover ${HoverLayer} {
    opacity: 1;
  }

  ${mobile({ minWidth: 250 })}
`;

const Image = styled.img`
  height: 80%;
  z-index: 2;

  ${mobile({ height: '70%' })}
`;

const Info = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h3`
  font-size: 24px;
  text-align: center;
`;

const ShortDesc = styled.div`
  color: #fff;
  text-align: center;
  margin: 1em;
  font-size: 1em;
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

const Icon = styled(Link)`
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  color: #222;
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

const HoverLayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const HoverLayerIcons = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
