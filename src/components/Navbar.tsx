import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { MENU_ITEMS } from '../utils/constants';

export const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <strong>LOGO</strong>
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
            <Input />
            <SearchIcon icon={faSearch} />
          </SearchContainer>
          <FontAwesomeIcon icon={faShoppingCart} />
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #eee;
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Left = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`;
const Center = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;
const Right = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const MenuContainer = styled.ul`
  align-items: center;
  display: flex;
  list-style-type: none;
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-size: 14px;
  margin: 0 25px;
`;

const MenuItemLink = styled.a`
  text-decoration: none;
  color: #555;
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
  padding: 5px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #777;
  font-size: 16px;
  margin-left: 10px;
`;
