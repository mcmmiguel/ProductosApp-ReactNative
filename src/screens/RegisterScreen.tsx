import React from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, Platform, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { loginTheme } from '../theme';
import { WhiteLogo } from '../components';
import { useForm } from '../hooks';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const onRegister = () => {
        console.log({ email, password });
        Keyboard.dismiss();
    };

    return (
        <>
            {/* Background */}
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}

            >
                <View style={loginTheme.formContainer}>
                    {/* Keyboard avoid view*/}
                    <WhiteLogo />
                    <Text style={loginTheme.title}>Registro</Text>

                    <Text style={loginTheme.label}>Nombre</Text>
                    <TextInput
                        style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
                        placeholder="Ingrese su nombre"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        underlineColorAndroid="white"
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'name')}
                        onSubmitEditing={onRegister}
                        value={name}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />

                    <Text style={loginTheme.label}>Email</Text>
                    <TextInput
                        style={[loginTheme.inputField, (Platform.OS === 'ios') && loginTheme.inputFieldIOS]}
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={onRegister}
                        value={email}
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
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />

                    {/* Boton login */}
                    <View style={loginTheme.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginTheme.button}
                            onPress={onRegister}
                        >
                            <Text style={loginTheme.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear nueva cuenta */}
                    <TouchableOpacity
                        style={loginTheme.returnButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.replace('LoginScreen')}
                    >
                        <Text style={loginTheme.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: '#5856D6',
    },
});
