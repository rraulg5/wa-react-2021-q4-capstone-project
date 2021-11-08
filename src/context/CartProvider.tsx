import { createContext, FC, ReactNode, useState } from 'react';
import { Data } from '../interfaces/ProductsResponse';

interface ContextCart {
  cartItems: CartState[];
  handleAddToCart: (item: Data, amount: number) => void;
}

export interface CartState {
  item: Data;
  amount: number;
}

export const CartContext = createContext<ContextCart>({
  cartItems: [],
  handleAddToCart: () => {},
});

interface Props {
  children: ReactNode;
}

export const CartProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartState[]>([]);

  const handleAddToCart = (cartItem: Data, amount: number) => {
    setCartItems((prev) => {
      const inCart = prev.find((product) => product.item.sku === cartItem.sku);
      if (inCart) {
        return prev.map((product) =>
          product.item.sku === cartItem.sku
            ? { ...product, amount: product.amount + amount }
            : product
        );
      }
      return [...prev, { item: cartItem, amount }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};
