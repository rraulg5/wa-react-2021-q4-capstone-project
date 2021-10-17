import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { MENU_ITEMS } from '../utils/constants';

export const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>FURNITFY</Logo>
        </Left>
        <Center>
          <MenuContainer>
            {MENU_ITEMS.map((menu) => (
              <MenuItem key={menu.title}>
                <MenuItemLink href={menu.url}>{menu.title}</MenuItemLink>
              </MenuItem>
            ))}
          </MenuContainer>
        </Center>
        <Right>
          <SearchContainer>
            <Input placeholder="Search..." />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ color: '#222', fontSize: 25, marginLeft: 30 }}
          />
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ color: '#666', fontSize: 35, marginLeft: 30 }}
          />
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #eee;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
`;

const Left = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`;
const Center = styled.div`
  align-items: center;
  display: flex;
  flex: 2;
  justify-content: center;
`;
const Right = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const Logo = styled.h1`
  font-size: 40px;
`;

const MenuContainer = styled.ul`
  align-items: center;
  display: flex;
  list-style-type: none;
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin: 0 25px;
`;

const MenuItemLink = styled.a`
  color: #666;
  transition: all 0.5s ease;
  text-decoration: none;

  &:hover {
    color: #222;
  }
`;

const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  display: flex;
  margin-right: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 7px 25px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #777;
  font-size: 16px;
  margin-left: -30px;
`;
