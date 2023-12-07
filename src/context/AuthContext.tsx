import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, LoginResponse, RegisterData, Usuario } from '../interfaces';
import { AuthState, authReducer } from './authReducer';
import cafeAPI from '../api/cafeAPI';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void
    signIn: (loginData: LoginData) => Promise<void>;
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

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
        // No token, no autenticado
        if (!token) {
            return dispatch({ type: 'notAuthenticated' });
        }

        // Hay token
        const resp = await cafeAPI.get('/auth');
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        await AsyncStorage.setItem('token', resp.data.token);

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            },
        });

    };

    const signUp = async ({ correo, nombre, password }: RegisterData) => {
        try {
            const { data } = await cafeAPI.post<LoginResponse>('/usuarios', {
                correo,
                password,
                nombre,
            });
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            console.log(error);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Por favor, revisa la información',
            });
        }
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

            await AsyncStorage.setItem('token', data.token);

        } catch (error: any) {
            console.log(error);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta',
            });
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' });
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
