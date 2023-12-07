import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context';

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext(AuthContext);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Protected Screen</Text>
            <Button
                title="Log Out"
                color="#5856D6"
                onPress={logOut}
            />
            <Text>
                {JSON.stringify(token, null, 5)}
            </Text>
            <Text>
                {JSON.stringify(user, null, 5)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,

    },
});
