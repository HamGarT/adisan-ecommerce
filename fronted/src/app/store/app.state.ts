import { AuthState } from "./reducers/auth.reducer";
import { CartState } from "./reducers/cart.reducer";

export interface AppState{
    cart : CartState,
    auth: AuthState
}