import React, { useContext } from 'react';
import { View, Text, TextInput, Platform, TouchableOpacity, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Background, WhiteLogo } from '../components';
import { loginTheme } from '../theme';
import { useForm } from '../hooks';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();
        signIn({ correo: email, password });
    };

    return (
        <>
            {/* Background */}
            <Background />

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}

            >
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
                        onChangeText={(value) => onChange(value, 'email')}
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />

                    {/* Boton login */}
                    <View style={loginTheme.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginTheme.button}
                            onPress={onLogin}
                        >
                            <Text style={loginTheme.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear nueva cuenta */}
                    <View style={loginTheme.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={loginTheme.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },
});
