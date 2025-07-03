import { createAction, props } from "@ngrx/store";
import { Producto } from "../../interfaces/types";

export const addToCart= createAction("[Cart component] AddToCart", props<{product:Producto}>());
export const removeItem = createAction('[Cart Component] RemoveItem', props<{productId: number}>());