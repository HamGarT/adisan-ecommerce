import { createActionGroup, props } from "@ngrx/store";
import { AuthentificationRequest, Usuario } from "../../interfaces/types";


export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Login: props<{ request: AuthentificationRequest }>(),
    'Login success': props<{ user: Usuario }>(),
  },
});

// export const authActions = createActionGroup({
//   source: 'auth',
//   events: {
//     Register: props<{ request: RegisterRequest }>(),
//     'Register success': props<{ user: User }>(),
//     'Register failure': props<{ erros: BackendErrors }>(),
//     Login: props<{ request: AuthentificationRequest }>(),
//     'Login success': props<{ user: User }>(),
//     'Login failure': props<{ erros: BackendErrors }>(),
//     'Get user': props<{ user: User }>(),

//   },
// });