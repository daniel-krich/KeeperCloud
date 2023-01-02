import { authenticate, changeAuthStateToError, changeAuthStateToLoading, unauthenticate } from './authentication.actions';
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

    on(authenticate, (state, { email, password }) => ({
        ...state,
        isUserLoggedIn: true,
        user: { username: email, email: email, firstname: 'first', lastname: 'last' },
        stateStatus: 'success'
    })),

    on(unauthenticate, (state) => ({
        ...state,
        isUserLoggedIn: false,
        user: null,
        stateStatus: 'pending'
    })),

    on(changeAuthStateToError, (state) => ({
        ...state,
        isUserLoggedIn: false,
        stateStatus: 'error'
    })),

    on(changeAuthStateToLoading, (state) => ({
        ...state,
        isUserLoggedIn: false,
        stateStatus: 'loading'
    }))
);