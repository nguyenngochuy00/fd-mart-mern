import { createSlice } from "@reduxjs/toolkit";

// appApi - communicate with redux and backend
import appApi from "../services/appApi";

const initialState = [];

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: { // reducers - change state
        updateProducts: (_, action) => {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.updateProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(appApi.endpoints.deleteProduct.matchFulfilled, (_, { payload }) => payload);
    },
});

export const { updateProducts } = productSlice.actions;
export default productSlice.reducer;