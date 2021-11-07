import styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartIcon = () => {
  return (
    <>
      <Icon icon={faShoppingCart} />
      <sup>
        <Badge>1</Badge>
      </sup>
    </>
  );
};

const Icon = styled(FontAwesomeIcon)`
  color: #222;
  font-size: 1.5rem;
`;

const Badge = styled.sup`
  background: rgb(0, 128, 128, 0.8);
  border-radius: 30%;
  color: #fff;
  font-size: 1em;
  padding: 0 5px;
`;
