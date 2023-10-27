import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   filters: {
      brand: [],
      price: [],
   },
   sort: {
      column: "",
      type: "",
   },
};

const filtersSlice = createSlice({
   name: "filters",
   initialState,
   reducers: {
      storingFilters(state, action) {
         const payload = action.payload;
         console.log('storing filter check payload', payload);

         state.filters = payload.filters || "";
         state.sort = payload.sort || "";
      },
   },
});

export const selectedAllFilter = (state) => {
   const { filters, sort } = state.filters;
   return { filters, sort };
};

export const { storingFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
