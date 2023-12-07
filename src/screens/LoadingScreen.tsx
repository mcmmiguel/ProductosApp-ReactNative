import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const LoadingScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <ActivityIndicator
                size={50}
                color="#5856D6"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
