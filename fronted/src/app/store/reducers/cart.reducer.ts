import { createReducer, on } from "@ngrx/store";
import { Producto } from "../../interfaces/types";
import { addToCart, clearCart, decrementProductCount, incrementProductCount, removeItem } from "../actions/cart.action";
import { CurrencyPipe } from "@angular/common";

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
    on(addToCart, (currentState, action) => ({
        ...currentState,
        products: [...currentState.products, action.product],
        totalPrice: currentState.totalPrice + action.product.precio
    })),

    on(removeItem, (currentState, action)=>({
        ...currentState,
        products: currentState.products.filter( product => product.id != action.productId)
    })),

    on(clearCart, ()=>({
        ...initalCartState,
    })),

    on(incrementProductCount, (currentState, action) => ({
        ...currentState,
        products: currentState.products.map(product =>
            product.id === action.productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
        )
    })),
     on(decrementProductCount, (currentState, action) => ({
        ...currentState,
        products: currentState.products.map(product =>
            product.id === action.productId
                ? { ...product, quantity: product.quantity - 1 }
                : product
        )
    }))
);