import { createAction, props } from '@ngrx/store';

export const authenticate = createAction(
    '[Authentication] Send authentication',
    props<{ email: string, password: string }>()
);

export const unauthenticate = createAction(
    '[Authentication] Send logout or unauthenticate'
);

export const changeAuthStateToError = createAction(
    '[Authentication] Change Auth State To Error'
);

export const changeAuthStateToLoading = createAction(
    '[Authentication] Change Auth State To Loading'
);