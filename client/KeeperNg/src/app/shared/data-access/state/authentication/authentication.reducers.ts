import { signinBegin, signinError, signinRefreshed, signinSuccess, signoutFinished } from './authentication.actions';
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

    on(signinRefreshed, (state, { user }) => ({
        ...state,
        user: {...user}
    })),

    on(signinError, (state) => ({
        ...state,
        isUserLoggedIn: false,
        user: null,
        stateStatus: 'error'
    })),

    on(signoutFinished, (state) => ({
        ...state,
        isUserLoggedIn: false,
        user: null,
        stateStatus: 'pending'
    }))
);