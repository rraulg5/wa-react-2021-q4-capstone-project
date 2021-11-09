import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../context/CartProvider';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { mobile } from '../responsive';

export const Cart = () => {
  const { cartItems, handleAddToCart, handleRemoveFromCart } =
    useContext(CartContext);

  return (
    <Container>
      <Title>Your cart</Title>
      {cartItems.length > 0 ? (
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <th>Pieces</th>
                <th></th>
                <th>Image</th>
                <th>SKU</th>
                <th>Product</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.item.sku}>
                  <td>
                    <AmountWrapper>
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => {
                          handleRemoveFromCart(product.item.sku);
                        }}
                      />
                      <Amount>{product.amount}</Amount>
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => {
                          handleAddToCart(product.item, 1);
                        }}
                      />
                    </AmountWrapper>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: 'red' }}
                      onClick={() => {
                        handleRemoveFromCart(product.item.sku, product.amount);
                      }}
                    />
                  </td>
                  <td>
                    <Image src={product.item.mainimage.url} alt="alt" />
                  </td>
                  <td>{product.item.sku}</td>
                  <td>{product.item.name}</td>
                  <td>$ {product.item.price.toLocaleString()}</td>
                  <td>
                    $ {(product.item.price * product.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={6} style={{ textAlign: 'right' }}>
                  TOTAL
                </td>
                <td>
                  ${' '}
                  {cartItems
                    .reduce((ack: number, item) => {
                      return ack + item.amount * item.item.price;
                    }, 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tbody>
          </Table>
          <ButtonCheckoutWrapper>
            <ButtonCheckout to="/checkout">Checkout Now</ButtonCheckout>
          </ButtonCheckoutWrapper>
        </Wrapper>
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
  padding: 1em;
`;

const Title = styled.h1`
  padding: 1.5em 0;
  text-align: center;
`;

const Wrapper = styled.div`
  padding: 1em;
`;

const Table = styled.table`
  width: 100%;

  & th,
  & td {
    text-align: center;
    padding: 0.25em;
  }
`;

const Image = styled.img`
  max-width: 100px;
`;

const AmountWrapper = styled.div`
  align-items: center;
  display: flex;
  font-weight: bold;
  margin: 1.5em 0;
`;

const Amount = styled.span`
  align-items: center;
  display: flex;
  border: 1px solid teal;
  border-radius: 15px;
  font-size: 1.5em;
  height: 40px;
  justify-content: center;
  margin: 0 5px;
  width: 40px;
`;

const CartEmpty = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  min-height: 500px;
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

const ButtonCheckoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2em 1em;

  ${mobile({ justifyContent: 'center' })}
`;
const ButtonCheckout = styled(NavLink)`
  background-color: teal;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  color: #fff;
  padding: 1.2em;
  text-decoration: none;
`;
