import styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext, CartState } from '../context/CartProvider';

const getTotalItems = (items: CartState[]) => {
  return items.reduce((ack: number, item) => ack + item.amount, 0);
};

export const CartIcon = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <Icon icon={faShoppingCart} />
      <sup>
        {cartItems.length > 0 && <Badge>{getTotalItems(cartItems)}</Badge>}
      </sup>
    </>
  );
};

const Icon = styled(FontAwesomeIcon)`
  color: #222;
  font-size: 1.5rem;
`;

const Badge = styled.sup`
  background: rgb(0, 128, 128, 0.8);
  border-radius: 30%;
  color: #fff;
  font-size: 1em;
  padding: 0 5px;
`;
