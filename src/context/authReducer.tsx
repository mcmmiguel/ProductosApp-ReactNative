import { Usuario } from '../interfaces';
export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null,
    errorMessage: string;
    user: Usuario | null;
}

type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload,
            };
        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            };
        case 'signUp':
            return {
                ...state,
                status: 'authenticated',
                errorMessage: '',
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'notAuthenticated':
        case 'logOut':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            };
        default:
            return state;
    }

};
