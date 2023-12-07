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
            const resp = await cafeAPI.post<LoginResponse>('/auth/login', {
                correo,
                password,
            });
            console.log(resp.data);

        } catch (error) {
            console.log(error);
        }
    };

    const logOut = () => {

    };

    const removeError = () => {

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
