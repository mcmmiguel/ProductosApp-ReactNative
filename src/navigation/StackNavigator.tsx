import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, LoginScreen, ProtectedScreen, RegisterScreen } from '../screens';
import { AuthContext } from '../context';

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
                    ? <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
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
