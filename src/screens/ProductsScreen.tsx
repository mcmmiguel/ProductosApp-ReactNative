import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context';

export const ProductsScreen = () => {

    const { products } = useContext(ProductsContext);

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={products}
                keyExtractor={(product) => product._id}

                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8}>
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View style={styles.itemSeparator} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    productName: {
        fontSize: 20,
    },
    itemSeparator: {
        borderBottomWidth: 2,
        marginVertical: 5,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
});
