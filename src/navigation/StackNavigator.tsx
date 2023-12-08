import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, LoginScreen, RegisterScreen } from '../screens';
import { AuthContext } from '../context';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();

export const StackNavigator = () => {

    const { status } = useContext(AuthContext);

    if (status === 'checking') {
        return <LoadingScreen />;
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            {
                status === 'authenticated'
                    ? <Stack.Screen name="ProtectedScreen" component={ProductsNavigator} />
                    : (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>
                    )
            }
        </Stack.Navigator>
    );
};
