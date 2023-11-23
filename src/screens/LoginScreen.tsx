import React from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Background, WhiteLogo } from '../components';
import { loginTheme } from '../theme';

export const LoginScreen = () => {
    return (
        <>
            {/* Background */}
            <Background />

            <View style={loginTheme.formContainer}>
                {/* Keyboard avoid view*/}
                <WhiteLogo />
                <Text style={loginTheme.title}>Login</Text>

                <Text style={loginTheme.label}>Email</Text>
                <TextInput
                    style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
                    placeholder="Ingrese su email"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    underlineColorAndroid="white"
                    selectionColor="white"
                    // onChangeText={}
                    // value=
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <Text style={loginTheme.label}>Contraseña</Text>
                <TextInput
                    style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
                    placeholder="Contraseña"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    underlineColorAndroid="white"
                    selectionColor="white"
                    // onChangeText={}
                    // value=
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                {/* Boton login */}
                <View style={loginTheme.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginTheme.button}
                    >
                        <Text style={loginTheme.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Crear nueva cuenta */}
                <View style={loginTheme.newUserContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => console.log('press')}
                    >
                        <Text style={loginTheme.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};
