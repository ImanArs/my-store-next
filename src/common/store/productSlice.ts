import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  maxPrice: number;
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  currentCurrency: string;
  exchangeRates: { [key: string]: number };
  searchQuery: string;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  maxPrice: 0,
  categories: [],
  currentCurrency: "USD",
  selectedCategory: "",
  priceRange: [0, 0],
  exchangeRates: {},
  searchQuery: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      console.log(state.exchangeRates);

      const prices = state.products.map((product) => product.price);
      state.maxPrice = Math.max(...prices);
      state.categories = Array.from(
        new Set(state.products.map((product) => product.category))
      );
      state.priceRange = [0, state.maxPrice];
      state.filteredProducts = state.products.map((product) => ({
        ...product,
        price: product.price,
      }));
    },
    filterProducts(state) {
      state.filteredProducts = state.products
        .map((product) => ({
          ...product,
          price:
            product.price * (state.exchangeRates[state.currentCurrency] || 1),
        }))
        .filter((product) => {
          const inPriceRange =
            product.price >= state.priceRange[0] &&
            product.price <= state.priceRange[1];
          const inCategory =
            state.selectedCategory === "" ||
            product.category === state.selectedCategory;
          const matchesSearchQuery =
            state.searchQuery === "" ||
            product.title
              .toLowerCase()
              .includes(state.searchQuery.toLowerCase());
          return inPriceRange && inCategory && matchesSearchQuery;
        });
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setSelectedCurrency(state, action: PayloadAction<string>) {
      state.currentCurrency = action.payload;
    },
    resetFilters(state) {
      state.filteredProducts = state.products;
      state.priceRange = [0, state.maxPrice];
      state.selectedCategory = "";
      state.currentCurrency = "USD";
    },
    setExchangeRates(state, action: PayloadAction<{ [key: string]: number }>) {
      state.exchangeRates = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setProducts,
  filterProducts,
  setPriceRange,
  setSelectedCategory,
  setSelectedCurrency,
  setExchangeRates,
  resetFilters,
  setSearchQuery,
} = productSlice.actions;

export default productSlice.reducer;
