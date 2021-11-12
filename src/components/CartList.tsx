import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { CartContext } from '../context/CartProvider';
import { mobile } from '../responsive';
import { QuantityControls } from './QuantityControls';

interface Props {
  cta: string;
  ctaRoute: string;
  goBack: string;
  goBackRoute: string;
  imgWidth: number;
  dynamic: boolean;
}

export const CartList: FC<Props> = ({
  cta,
  ctaRoute,
  goBack,
  goBackRoute,
  imgWidth,
  dynamic,
}) => {
  const { cartItems, handleRemoveFromCart } = useContext(CartContext);
  const history = useHistory();
  return (
    <>
      <Row>
        <Quantity>
          <b>Quantity</b>
        </Quantity>
        <ImageWrapper>
          <b>Img</b>
        </ImageWrapper>
        <ProductName>
          <b>Product</b>
        </ProductName>
        {dynamic && (
          <Price>
            <b>Price</b>
          </Price>
        )}

        <Subtotal>
          <b>Subtotal</b>
        </Subtotal>
      </Row>
      <Line />
      {cartItems.map((product) => (
        <Row key={product.item.sku}>
          <Quantity>
            {!dynamic ? product.amount : <QuantityControls product={product} />}
          </Quantity>

          <ImageWrapper>
            <Image
              src={product.item.mainimage.url}
              width={imgWidth}
              alt={product.item.name}
            />
          </ImageWrapper>
          <ProductName>{product.item.name}</ProductName>
          {dynamic && <Price>${product.item.price.toLocaleString()}</Price>}

          <Subtotal>
            <b>${(product.item.price * product.amount).toLocaleString()}</b>
          </Subtotal>
          {dynamic && (
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ color: '#c82333' }}
              onClick={() => {
                handleRemoveFromCart(product.item.sku, product.amount);
              }}
            />
          )}
        </Row>
      ))}
      <Line />
      <Row>
        <TotalTxt>
          <b>TOTAL:</b>
        </TotalTxt>
        <Total>
          <b>
            $
            {cartItems
              .reduce((ack: number, item) => {
                return ack + item.amount * item.item.price;
              }, 0)
              .toLocaleString()}
          </b>
        </Total>
      </Row>
      <ActionBtnWrapper>
        <Button
          btnType={'light'}
          onClick={() => {
            history.push(goBackRoute);
          }}
        >
          {goBack}
        </Button>
        <Button
          btnType={'primary'}
          onClick={() => {
            history.push(ctaRoute);
          }}
        >
          {cta}
        </Button>
      </ActionBtnWrapper>
    </>
  );
};

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  padding: 1em;
  text-align: center;

  /* ${mobile({ flexDirection: 'column' })} */
`;
const Quantity = styled.span`
  flex: 1;
`;
const Image = styled.img`
  width: 80%;
`;
const ProductName = styled.span`
  padding: 0.5em;
  flex: 3;
  ${mobile({ flex: 1, padding: 0 })}
`;
const Subtotal = styled.span`
  flex: 1;
`;

const TotalTxt = styled.span`
  text-align: right;
  font-size: 1.3em;
  flex: 5;
  margin-right: 0.5em;
`;

const Total = styled.span`
  color: teal;
  font-size: 1.3em;
  flex: 1;
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const Price = styled.div`
  flex: 1;
`;

interface PropsBtn {
  btnType: string;
}

const Button = styled.button<PropsBtn>`
  background-color: ${({ btnType }) =>
    btnType === 'primary' ? 'teal' : '#dfdfdf'};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  color: ${({ btnType }) => (btnType === 'primary' ? '#fff' : '#333')};
  font-size: 1em;
  font-weight: ${({ btnType }) => (btnType === 'primary' ? 'bold' : 'normal')};
  padding: 1em 2em;

  ${mobile({ padding: '0.5em 1em' })}
`;

const ActionBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const Line = styled.hr`
  background-color: #eee;
  border-color: #eee;
  color: #eee;
  margin: 0 auto;
`;
