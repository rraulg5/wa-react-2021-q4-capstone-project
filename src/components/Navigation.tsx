import React from 'react';
import { MENU_ITEMS } from '../utils/constants';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        {MENU_ITEMS.map((menu) => (
          <li key={menu.title}>
            <a href={menu.url}>{menu.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
