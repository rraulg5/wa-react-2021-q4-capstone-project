import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

const Container = styled.div`
  /* max-width: 1300px;
  margin: auto;
  padding: 0 25px; */
`;

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  );
};
