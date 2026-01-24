import { createContext } from "react-router";

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Cart {
  cartItems: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    count_in_stock: number;
    qty: number;
  }>;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  expiresIn: number;
}

export const userContext = createContext<User | null>(null);
export const cartContext = createContext<Cart | null>(null);
