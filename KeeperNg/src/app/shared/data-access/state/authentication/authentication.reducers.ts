import { authenticate, changeAuthStateToError, changeAuthStateToLoading, signinBegin, signinError, signinSuccess, unauthenticate } from './authentication.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthenticationStateInterface } from '../interfaces/authentication-state.interface';

const authInitialState : AuthenticationStateInterface = {
    user: null,
    isUserLoggedIn: false,
    error: '',
    stateStatus: 'pending'
}

export const authenticationReducer = createReducer(
    authInitialState,

    on(signinBegin, (state) => ({
        ...state,
        isUserLoggedIn: false,
        user: null,
        stateStatus: 'loading'
    })),

    on(signinSuccess, (state, { user }) => ({
        ...state,
        isUserLoggedIn: true,
        user: {...user},
        stateStatus: 'success'
    })),

    on(signinError, (state) => ({
        ...state,
        isUserLoggedIn: false,
        user: null,
        stateStatus: 'error'
    })),
);