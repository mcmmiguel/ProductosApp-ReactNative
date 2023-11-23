import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Background, WhiteLogo } from '../components';
import { LoginTheme } from '../theme';

export const LoginScreen = () => {
    return (
        <>
            {/* Background */}
            <Background />
            {/* Keyboard avoid view*/}
            <WhiteLogo />
            <Text style={LoginTheme.title}>Login</Text>
            <Text style={LoginTheme.label}>Email</Text>

            <TextInput
                placeholder="Ingrese su email"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                keyboardType="email-address"
            />
        </>
    );
};
