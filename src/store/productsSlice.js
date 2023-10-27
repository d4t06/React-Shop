import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productServices from "../services/productServices";
import searchService from "../services/searchService";

const initialState = {
  status: "idle",
  productState: {
    products: [],
    count: 0,
    pageSize: 0,
  },
  category: "",
  page: 1,
};

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async (query) => {
    try {
      let response;
      if (query.category.includes("search")) {
        console.log("include search");
        const key = query.category.split("search=")[1]; //search=iphone 14
        response = await searchService({
          q: key,
          page: query.page,
          sort: query.sort.column ? query.sort : [],
        });
      } else {
        response = await productServices.getProducts({
          ...query,
          sort: query.sort.column ? query.sort : [],
        });
      }
      // await sleep(1000);

      return { productState: response, ...query };
    } catch (error) {
      console.log("fetchProducts error", error);
    }
  }
);

// product.rows.push
export const getMoreProducts = createAsyncThunk(
  "/products/getMoreProducts",
  async (query) => {
    try {
      let response;
      if (query.category.includes("search")) {
        console.log("include search");
        const key = query.category.split("search=")[1]; //search=iphone 14
        response = await searchService({ q: key, page: query.page, sort: query.sort });
      } else {
        response = await productServices.getProducts(query);
      }
      // await sleep(1000);

      return { productState: response, ...query };
    } catch (error) {
      console.log("fetchProducts error", error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storingProducts(state, action) {
      const payload = action.payload;

      state.productState.count = payload.productState.count || state.productState.count;
      state.productState.products.push(...payload.productState.products);

      state.status = "successful";
      state.page = payload.page;
      state.category = payload.category || "";
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const payload = action.payload;

        console.log("check payload", payload);

        state.status = "successful";
        state.page = payload.page || 1;
        state.category = payload.category || "";
        state.productState = payload.productState || state.productState;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
      })

      // getMoreProducts
      .addCase(getMoreProducts.pending, (state, action) => {
        state.status = "more-loading";
      })
      .addCase(getMoreProducts.fulfilled, (state, action) => {
        console.log("getMoreProducts =", action);
        const payload = action.payload;

        state.productState.count = payload.productState.count;
        state.productState.products.push(...payload.productState.products);

        state.status = "successful";
        state.page = payload.page;
        state.category = payload.category || "";
      })
      .addCase(getMoreProducts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const selectedAllProduct = (state) => {
  const {
    status,
    productState: { products, pageSize, count },
    category,
    page,
  } = state.products;

  return { status, products, category, page, count, pageSize };
};

export const { storingProducts } = productsSlice.actions;

export default productsSlice.reducer;
