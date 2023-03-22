import { createAction, props } from '@ngrx/store';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';


export const signinBegin = createAction(
    '[Auto authentication] Begin authentication'
);

export const signinSuccess = createAction(
    '[Auto authentication] End authentication with success',
    props<{ user: UserInterface }>()
);

export const signinRefreshed = createAction(
    '[Auto authentication] Authentication credentials refresh',
    props<{ user: UserInterface }>()
);

export const signinError = createAction(
    '[Auto authentication] End authentication with error'
);

export const signoutBegin = createAction(
    '[Sign-out] Begin Sign-out'
);

export const signoutFinished = createAction(
    '[Sign-out] Finished Sign-out'
);