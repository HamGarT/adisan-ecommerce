import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../../interfaces/types";
import { authActions } from "../actions/auth.action";


export interface AuthState {
  status: string;
  isLogin: boolean;
  currentUser: Usuario | null;
}

const initialState: AuthState = {
  currentUser: null,
  status: 'pending',
  isLogin: false,
};

export const authReducer = createReducer(
    initialState,
    on(authActions.login, (currentState) => ({
      ...currentState,
      status: 'submitting',
      validatonError: null,
    })),
    on(authActions.loginSuccess, (currentState, action) => ({
      ...currentState,
      status: 'success',
      currentUser: action.user,
      isLogin: true,
    })),
)