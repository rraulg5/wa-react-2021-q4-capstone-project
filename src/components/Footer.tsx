import styled from 'styled-components';
import { FOOTER_TEXT } from '../utils/constants';

export const Footer = () => {
  return (
    <Container>
      <p>{FOOTER_TEXT}</p>
    </Container>
  );
};

const Container = styled.footer`
  align-items: center;
  background-color: #222;
  color: #fff;
  display: flex;
  font-size: 18px;
  justify-content: center;
  padding: 30px;
  text-align: center;
`;
