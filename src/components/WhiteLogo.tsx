import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export const WhiteLogo = () => {
    return (
        <View style={styles.mainContainer}>
            <Image style={styles.logo} source={require('../assets/react-logo-white.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 100,
    },
});
