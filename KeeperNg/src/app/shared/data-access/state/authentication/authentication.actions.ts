import { createAction, props } from '@ngrx/store';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';


export const signinBegin = createAction(
    '[Auto authentication] Begin authentication'
);

export const signinSuccess = createAction(
    '[Auto authentication] End authentication with success',
    props<{ user: UserInterface }>()
);

export const signinError = createAction(
    '[Auto authentication] End authentication with error'
);



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