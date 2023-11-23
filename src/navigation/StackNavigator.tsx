import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, ProtectedScreen, RegisterScreen } from '../screens';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
        </Stack.Navigator>
    );
};
