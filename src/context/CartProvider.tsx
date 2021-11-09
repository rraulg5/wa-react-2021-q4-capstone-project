import { createContext, FC, ReactNode, useState } from 'react';
import { Data } from '../interfaces/ProductsResponse';

interface ContextCart {
  cartItems: CartState[];
  handleAddToCart: (item: Data, amount: number) => void;
  handleRemoveFromCart: (sku: string, amount?: number) => void;
}

export interface CartState {
  item: Data;
  amount: number;
}

export const CartContext = createContext<ContextCart>({
  cartItems: [],
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
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
            ? {
                ...product,
                amount: Math.min(product.item.stock, product.amount + amount),
              }
            : product
        );
      }
      return [...prev, { item: cartItem, amount }];
    });
  };

  const handleRemoveFromCart = (sku: string, amount = 1) => {
    setCartItems((prev) => {
      return prev.reduce((ack, product) => {
        if (product.item.sku === sku) {
          if (product.amount === 1 || amount > 1) return ack;
          return [...ack, { ...product, amount: product.amount - amount }];
        } else {
          return [...ack, { ...product }];
        }
      }, [] as CartState[]);
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
