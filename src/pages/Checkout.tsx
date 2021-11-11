import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from '../hooks/useForm';
import { FormI } from '../interfaces/FormI';
import { mobile } from '../responsive';
import { CartContext } from '../context/CartProvider';
import { useHistory } from 'react-router';
import { CartList } from '../components/CartList';

export const Checkout = () => {
  const initialForm: FormI = {
    name: '',
    email: '',
    zipCode: '',
    notes: '',
  };
  const { values: formValues, handleInputChange } = useForm(initialForm);
  const { cartItems } = useContext(CartContext);
  const history = useHistory();

  useEffect(() => {
    if (cartItems.length === 0) {
      history.push('/cart');
    }
  }, [cartItems, history]);

  return (
    <Container>
      <Left>
        <Title>Customer Information</Title>
        <Form>
          <FormWrapper>
            <FormGroup>
              <Label htmlFor="name">Name: </Label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formValues.name}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email: </Label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={formValues.email}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="zipCode>">Zip Code: </Label>
              <input
                type="number"
                name="zipCode"
                onChange={handleInputChange}
                value={formValues.zipCode}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="notes>">Order notes: </Label>
              <textarea
                name="notes"
                id=""
                cols={30}
                rows={10}
                onChange={handleInputChange}
                value={formValues.notes}
              ></textarea>
            </FormGroup>
          </FormWrapper>
        </Form>
      </Left>
      <Right>
        <Summary>
          <Title>Summary</Title>
          <Line />
          <SummaryWrapper>
            <CartList
              cta={'Place order'}
              ctaRoute={'/#'}
              goBack={'Go back to cart'}
              goBackRoute={'/cart'}
              imgWidth={50}
              dynamic={false}
            />
          </SummaryWrapper>
        </Summary>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;

  ${mobile({ flexDirection: 'column' })}
`;
const Left = styled.div`
  flex: 1;
`;

const Form = styled.form`
  padding: 0 2em;

  ${mobile({ padding: '0 0.5em' })}
`;

const FormWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Label = styled.label`
  padding: 0.5em;
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
`;

const Summary = styled.div``;

const SummaryWrapper = styled.div`
  padding: 2em;
  ${mobile({ padding: 0 })}
`;

const FormGroup = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5em;

  & input,
  & textarea {
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 1.5em;
    padding: 0.2em;
    width: 100%;
    resize: none;
  }
`;

const Title = styled.h3`
  font-size: 2em;
  padding: 1em 0;
  text-align: center;
`;

const Line = styled.hr`
  background-color: #ccc;
  border-color: #ccc;
  color: #ccc;
  width: 50%;
  margin: 0 auto;
`;
