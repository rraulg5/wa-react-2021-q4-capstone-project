import { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartProvider';
import { NavLink } from 'react-router-dom';
import { mobile } from '../responsive';
import { CartList } from '../components/CartList';

export const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Container>
      <Title>Your cart</Title>
      {cartItems.length > 0 ? (
        <CartList
          cta="Proceed to checkout"
          ctaRoute={'/checkout'}
          goBack={'Continue Shopping'}
          goBackRoute={'/products'}
          imgWidth={100}
          dynamic={true}
        />
      ) : (
        <CartEmpty>
          <CartEmptyMsg>Your cart is empty</CartEmptyMsg>
          <Button to="/products">Explore products</Button>
        </CartEmpty>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1em 10em;

  ${mobile({ padding: '0' })}
`;

const Title = styled.h1`
  padding: 1.5em 0;
  text-align: center;
`;

const CartEmpty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  min-height: 350px;
`;

const CartEmptyMsg = styled.p`
  font-size: 1.5em;
  padding: 1em;
`;

const Button = styled(NavLink)`
  background-color: #222;
  border-radius: 30px;
  color: #fff;
  padding: 1.2em;
  text-decoration: none;
`;
