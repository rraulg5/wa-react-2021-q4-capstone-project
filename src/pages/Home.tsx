import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Slider } from '../components/Slider';
import { Categories } from '../components/Categories';
import { FeaturedProducts } from '../components/FeaturedProducts';

export const Home = () => {
  return (
    <>
      <Slider />
      <Categories />
      <FeaturedProducts />

      <ButtonContainer>
        <Button to="/products">View all products</Button>
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
`;

const Button = styled(Link)`
  background-color: #222;
  border: none;
  border-radius: 1em;
  color: #fff;
  font-size: 1.1em;
  padding: 1em 2em;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
