import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../app.state";

const selectAuthState = (state: AppStateInterface) => state.authentication;

export const selectAuthUser = createSelector(
    selectAuthState,
    e => ({ isUserLoggedIn: e.isUserLoggedIn, user: e.user, stateStatus: e.stateStatus })
);

export const selectIsUserLoggedIn = createSelector(
    selectAuthState,
    e => e.isUserLoggedIn
);

export const selectUserNames = createSelector(
    selectAuthState,
    e => ({ firstname: e.user?.firstname, lastname: e.user?.lastname })
);

export const selectAuthStateStatus = createSelector(
    selectAuthState,
    e => e.stateStatus
);