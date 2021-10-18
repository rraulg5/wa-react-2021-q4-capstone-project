import { css } from 'styled-components';

export const mobile = (props: object) => {
  return css`
    @media only screen and (max-width: 768px) {
      ${{ ...props }}
    }
  `;
};
