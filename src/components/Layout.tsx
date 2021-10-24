import { FC, ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

interface Props {
  children: ReactNode;
  showHomepage: (showHome: boolean) => void;
}

export const Layout: FC<Props> = ({ children, showHomepage }) => {
  return (
    <>
      <Header showHomepage={showHomepage} />
      <main>{children}</main>
      <Footer />
    </>
  );
};
