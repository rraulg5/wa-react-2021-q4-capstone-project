import { FC, ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
