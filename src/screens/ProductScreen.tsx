import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id, name = '' } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: name ? name : 'New Product',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View>
            <Text>{id} {name}</Text>
        </View>
    );
};
