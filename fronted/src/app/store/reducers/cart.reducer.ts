import { createReducer, on } from "@ngrx/store";
import { Producto } from "../../interfaces/types";
import { addToCart } from "../actions/cart.action";

export interface CartState {
    products: Producto[];
    totalPrice: number;
}

export const initalCartState: CartState = {
    products: [],
    totalPrice: 0
}

export const cartReducer = createReducer(
    initalCartState,
    on(addToCart, (currentState, action )=>({
        ...currentState,
        products: [...currentState.products, action.product],
        totalPrice: currentState.totalPrice + action.product.precio
    })
    ),
);