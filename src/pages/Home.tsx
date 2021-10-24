import { Slider } from '../components/Slider';
import { Categories } from '../components/Categories';
import { Products } from '../components/Products';
import styled from 'styled-components';
import { FC } from 'react';

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #222;
  border: none;
  border-radius: 1em;
  color: #fff;
  cursor: pointer;
  font-size: 1.1em;
  padding: 1em 2em;
`;

interface Props {
  showHomepage: (showHome: boolean) => void;
}

export const Home: FC<Props> = ({ showHomepage }) => {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <ButtonContainer>
        <Button
          onClick={() => {
            showHomepage(false);
          }}
        >
          View all products
        </Button>
      </ButtonContainer>
    </>
  );
};
