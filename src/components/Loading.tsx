import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Loading = () => {
  return (
    <Container>
      <Icon icon={faSpinner} spin={true} />
      <br />
      Loading...
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  opacity: 0.7;
`;
