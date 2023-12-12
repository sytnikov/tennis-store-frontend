import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import Product from "../../types/Product";
import CreateProductInput from "../../types/CreateProductInput";
import UpdateProductInput from "../../types/UpdateProductInput";
import { ProductsReducerState } from "../../types/InitialState";
import { baseURL } from "../../common/common";
import config from "../../common/config";

const productURL = `${baseURL}/products`;

export const initialState: ProductsReducerState = {
  products: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(productURL);
      const products = response.data;
      return products;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProductAsync = createAsyncThunk(
  "fetchSingleProductAsync",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product>(`${productURL}/${id}`);
      const data = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "createProductAsync",
  async (newProduct: CreateProductInput, { rejectWithValue }) => {
    try {
      const response = await axios.post(productURL, newProduct, config);
      const data: Product = response.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async ({ update, _id }: UpdateProductInput, { rejectWithValue }) => {
    try {
      const response = await axios.put<Product>(
        `${productURL}/${_id}`,
        update,
        config
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "deletePoductAsync",
  async (_id: string, { rejectWithValue }) => {
    try {
      console.log('👀 Enter reducer', )
      const response = await axios.delete<string>(
        `${productURL}/${_id}`,
        config
      );
      // if (!response.data) {
      //   throw new Error("The product cannot be deleted");
      // }
      console.log('response:', response.data)
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<string>) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isError: true,
          isLoading: false,
          message: action.payload.message,
        };
      }
    });
    builder.addCase(fetchSingleProductAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    });
    builder.addCase(fetchSingleProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isError: true,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(createProductAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        products: [...state.products, action.payload],
      };
    });
    builder.addCase(createProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isError: true,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(updateProductAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      const foundIndex = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (foundIndex > -1) {
        state.products[foundIndex] = action.payload;
      }
    });
    builder.addCase(updateProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isError: true,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(deleteProductAsync.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      if (typeof action.payload === "string") {
        state.products = state.products.filter((p) => p._id !== action.payload);
      }
    });
    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      if (action.payload instanceof AxiosError) {
        return {
          ...state,
          isError: true,
          error: action.payload.message,
        };
      }
    });
  },
});

const productsReducer = productsSlice.reducer;
export const { sortByPrice, reset } = productsSlice.actions;
export default productsReducer;
