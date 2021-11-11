import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { CartContext, CartState } from '../context/CartProvider';
import { mobile } from '../responsive';

interface Props {
  product: CartState;
}

export const QuantityControls: FC<Props> = ({ product }) => {
  const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext);

  return (
    <Container>
      <FontAwesomeIcon
        icon={faMinus}
        onClick={() => {
          handleRemoveFromCart(product.item.sku);
        }}
      />
      <Quantity>{product.amount}</Quantity>
      <FontAwesomeIcon
        icon={faPlus}
        style={{
          color: product.amount === product.item.stock ? '#ccc' : 'inherit',
        }}
        onClick={() => {
          handleAddToCart(product.item, 1);
        }}
      />
    </Container>
  );
};
const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Quantity = styled.span`
  color: teal;
  font-size: 1.2em;
  font-weight: bold;
  padding: 1em;

  ${mobile({ padding: 5 })}
`;
