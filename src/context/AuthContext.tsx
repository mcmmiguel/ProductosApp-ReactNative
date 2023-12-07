import React, { createContext, useReducer } from 'react';
import { LoginData, LoginResponse, Usuario } from '../interfaces';
import { AuthState, authReducer } from './authReducer';
import cafeAPI from '../api/cafeAPI';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: ({ correo, password }: LoginData) => Promise<void>;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState: AuthState = {
    status: 'checking',
    errorMessage: '',
    token: null,
    user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInitialState);

    const signUp = () => {

    };

    const signIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await cafeAPI.post<LoginResponse>('/auth/login', {
                correo,
                password,
            });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });

        } catch (error: any) {
            console.log(error);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta',
            });
        }
    };

    const logOut = () => {

    };

    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
