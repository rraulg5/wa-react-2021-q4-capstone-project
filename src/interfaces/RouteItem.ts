import { FC } from 'react';

export default interface RouteItem {
  key: string;
  path: string;
  name: string;
  exact: boolean;
  component: FC<{}>;
}
