/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

export const ProductsScreen = ({ navigation }: Props) => {

    const { products } = useContext(ProductsContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('ProductScreen', {})}
                >
                    <Text>Add</Text>
                </TouchableOpacity>
            ),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={products}
                keyExtractor={(product) => product._id}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={
                            () => navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre,
                            })
                        }>
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
    addButton: {
        marginRight: 20,
    },
});
