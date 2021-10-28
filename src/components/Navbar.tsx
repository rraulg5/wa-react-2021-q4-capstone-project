import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  faBars,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { mobile } from '../responsive';
import { MENU_ITEMS } from '../utils/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo to="/">
        FURNIT<span>FY</span>
      </Logo>

      <MobileMenuIcon icon={faBars} onClick={() => setIsOpen(!isOpen)} />
      <Menu isOpen={isOpen}>
        {MENU_ITEMS.map((menu) => (
          <MenuLink to={menu.url} activeClassName="active" key={menu.title}>
            {menu.title}
          </MenuLink>
        ))}
        <MenuLink to="/#">
          <CartIcon icon={faShoppingCart} />
        </MenuLink>
      </Menu>
      <SearchContainer isOpen={isOpen}>
        <Input placeholder="Search..." />
        <SearchIcon icon={faSearch} />
      </SearchContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  align-items: center;
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 1.5rem;
`;

const Logo = styled(NavLink)`
  font-size: 2rem;
  font-weight: bold;
  color: #222;
  cursor: pointer;
  padding: 1rem 0;
  text-decoration: none;

  span {
    font-weight: lighter;
  }

  ${mobile({ fontSize: 24 })}
`;

interface MenuProps {
  isOpen: boolean;
}

const Menu = styled.div<MenuProps>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;

  ${mobile({
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
    maxHeight: ({ isOpen }: MenuProps) => (isOpen ? '300px' : 0),
    transition: 'max-height 0.5s ease-in',
  })}
`;
const MenuLink = styled(NavLink)`
  color: #666;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  text-align: center;
  transition: all 0.5s ease;
  text-decoration: none;
  text-transform: capitalize;

  &:hover {
    color: #222;
  }

  &.active {
    color: #222;
    text-decoration: underline;
  }
`;

const MobileMenuIcon = styled(FontAwesomeIcon)`
  color: '#222';
  cursor: pointer;
  display: none;
  font-size: 1.5rem;

  ${mobile({ display: 'flex' })}
`;

const SearchContainer = styled.div<MenuProps>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-right: 30px;

  ${mobile({
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    maxHeight: ({ isOpen }: MenuProps) => (isOpen ? '300px' : 0),
    marginBottom: '0.5rem',
    transition: 'max-height 0.5s ease-in',
  })}
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 7px 25px;
`;

const CartIcon = styled(FontAwesomeIcon)`
  color: #222;
  font-size: 1.5rem;
  ${mobile({ display: 'flex' })};
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #777;
  font-size: 1rem;
  margin-left: -2.5rem;
`;
