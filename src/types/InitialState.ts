import CartItem from "./CartItem";
import Product from "./Product";
import User from "./User";
import Category from "./Category";
import { AxiosError } from "axios";
import { ErrorMessage } from "./ErrorMessage";

export type ProductsReducerState = {
  products: Product[];
  product?: Product;
  loading: boolean;
  error?: string;
}

export type UsersReducerState = {
  users: User[];
  loading: boolean;
  error?: any;
}

export type CartReducerState = {
  cartItems: CartItem[];
}

export type AuthReducerState = {
  accessToken?: string;
  currentUser?: User;
  error?: string;
}

export type CategoriesReducerState = {
  categories: Category[];
  loading: boolean
  error?: string;
}
