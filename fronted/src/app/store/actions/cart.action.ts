import { createAction, props } from "@ngrx/store";
import { Producto } from "../../interfaces/types";

export const addToCart= createAction("[Cart component] AddToCart", props<{product:Producto}>());
export const removeItem = createAction('[Cart Component] RemoveItem', props<{productId: string}>());
export const incrementProductCount = createAction('[Cart Component] IncrementProductCount', props<{productId: string}>());
export const decrementProductCount = createAction('[Cart Component] DecrementProductCount', props<{productId: string}>());
export const clearCart = createAction('[Cart Component] ClearCart');