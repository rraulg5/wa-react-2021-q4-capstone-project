import { FormEvent, useState } from 'react';
import { FormI } from '../interfaces/FormI';

export const useForm = (initialState: FormI) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({
    currentTarget,
  }: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({
      ...values,
      [currentTarget.name]: currentTarget.value,
    });
  };

  return { values, handleInputChange, reset };
};
