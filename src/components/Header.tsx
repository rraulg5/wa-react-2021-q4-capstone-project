import { FC } from 'react';
import { Navbar } from './Navbar';

interface Props {
  showHomepage: (showHome: boolean) => void;
}

export const Header: FC<Props> = ({ showHomepage }) => {
  return (
    <header>
      <Navbar showHomepage={showHomepage} />
    </header>
  );
};
