import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CartState } from "../reducers/cart.reducer";

export const selectCartState = (state: AppState) => state.cart;
export const seletctCartProducts = createSelector(
    selectCartState, (state: CartState) => state.products
)
