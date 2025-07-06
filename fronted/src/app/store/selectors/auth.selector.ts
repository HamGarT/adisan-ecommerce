import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "../reducers/auth.reducer";

export const selectAuthState = (state: AppState) => state.auth;
export const selectAuthenticatedUser = createSelector(
    selectAuthState, (state: AuthState) => state.currentUser
)

export const selectAuthenticatedUserId = createSelector(
    selectAuthState, (state: AuthState) => state.currentUser?.id
)
