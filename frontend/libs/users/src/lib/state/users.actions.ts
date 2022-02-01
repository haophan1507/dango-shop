import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const buildUserSession = createAction('[User] Build User Session')

export const buildUserSessionSuccess = createAction(
  '[User] Build User Session Success',
  props<{ user: User }>()
);

export const buildUserSessionFailed = createAction(
  '[User] Build User Session Failed'
);
