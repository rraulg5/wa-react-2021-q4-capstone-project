import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { mobile } from '../responsive';
import { CartContext } from '../context/CartProvider';
import { Loading } from '../components/Loading';
import { Product } from '../interfaces/Product';
import { useFetch } from '../hooks/useFetch';

export const ProductDetails = () => {
  const { cartItems, handleAddToCart } = useContext(CartContext);
  const [stock, setStock] = useState(0);

  const { id }: { id: string } = useParams();
  const [product, setProduct] = useState<Product>();
  const [productImg, setProductImg] = useState('');
  const [quantity, setQuantity] = useState(1);

  const endpoint = `${encodeURIComponent(
    `[[at(document.id, "${id}")]]`
  )}&lang=en-us`;
  const { data, isLoading } = useFetch('products', endpoint);

  useEffect(() => {
    if (data) {
      setProduct(data.results[0]);
      setProductImg(data.results[0].data.mainimage.url);
    }
  }, [data]);

  useEffect(() => {
    if (product?.data) {
      const cartIdx = cartItems.findIndex(
        (cartItem) => product.data.sku === cartItem.item.sku
      );

      const localStock = cartItems[cartIdx]?.amount | 0;
      setStock(product.data.stock - localStock);
    }
  }, [cartItems, product]);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <ImgContainer>
            <Image src={productImg} />
            <Gallery>
              {product?.data.images.map(({ image }, idx) => (
                <img
                  src={image.url}
                  alt={image.alt!}
                  key={idx}
                  onClick={() => {
                    setProductImg(image.url);
                  }}
                />
              ))}
            </Gallery>
          </ImgContainer>
          <InfoContainer>
            <Title>{product?.data.name}</Title>
            <Description>{product?.data.description[0].text}</Description>
            <Price>$ {product?.data.price.toLocaleString()}</Price>
            {stock > 0 && (
              <AmountContainer>
                <AmountWrapper>
                  <FontAwesomeIcon
                    icon={faMinus}
                    style={{
                      color: quantity === 1 ? '#ccc' : 'inherit',
                    }}
                    onClick={() => {
                      setQuantity(Math.max(1, quantity - 1));
                    }}
                  />
                  <Amount>{Math.min(stock, quantity)}</Amount>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      color: quantity === stock ? '#ccc' : 'inherit',
                    }}
                    onClick={() => {
                      setQuantity(Math.min(stock, quantity + 1));
                    }}
                  />
                </AmountWrapper>
                <Button
                  onClick={() => {
                    handleAddToCart(product?.data!, quantity);
                    setStock(stock - quantity);
                  }}
                >
                  ADD TO CART
                </Button>
              </AmountContainer>
            )}

            <Sku>
              <b>Stock:</b> {stock}
            </Sku>
            <Category>
              <b>Category:</b>{' '}
              <Link to={`/products?category=${product?.data.category.slug!}`}>
                {product?.data.category.slug.toUpperCase()}
              </Link>
            </Category>
            <Tags>
              <b>Tags:</b>{' '}
              {product?.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </Tags>
            <Sku>
              <b>SKU:</b> {product?.data.sku}
            </Sku>

            <SpecsContainer>
              <SpecsTitle>Specs:</SpecsTitle>
              <table>
                <tbody>
                  {product?.data.specs.map((spec) => (
                    <tr key={spec.spec_name}>
                      <td>
                        <b>{spec.spec_name}:</b>
                      </td>
                      <td>{spec.spec_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SpecsContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  padding: 1em;

  ${mobile({ flexDirection: 'column' })}
`;

const ImgContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2em;
  justify-content: center;

  ${mobile({ padding: '0.5em' })}
`;

const Image = styled.img`
  /* object-fit: cover; */
  /* height: 75vh; */
  width: 80%;
  margin-bottom: 10px;

  ${mobile({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: lighter;
`;

const Description = styled.p`
  font-size: 1.1em;
  margin: 1.5em 0;
`;

const Price = styled.div`
  font-size: 2em;
  font-weight: lighter;
  margin: 0.5em 0;
`;

const Sku = styled.div`
  margin: 0.5em 0;
`;
const Category = styled.div`
  margin: 0.5em 0;

  & a {
    color: #222;
  }
`;
const Tags = styled.span`
  margin: 0.5em 0;
  & span:after {
    content: ' | ';
  }

  & span:last-child:after {
    content: '';
  }
`;

const SpecsContainer = styled.div`
  padding: 1em 0;
  & table {
    width: 80%;
    ${mobile({ width: '100%' })}
  }
`;

const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  width: 50%;
  ${mobile({ width: '100%' })}
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

const Button = styled.button`
  background-color: #fff;
  border: 2px solid teal;
  color: teal;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  padding: 15px;

  &:hover {
    background-color: teal;
    color: #fff;
  }
`;

const SpecsTitle = styled.p`
  font-size: 1.5em;
  margin: 0.5em 0;
`;

const Gallery = styled.div`
  & img {
    cursor: pointer;
    margin: 0 2px;
    max-width: 80px;
  }
`;
