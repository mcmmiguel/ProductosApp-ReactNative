import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useCategories } from '../hooks';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id, name = '' } = route.params;

    const [selectedLanguage, setSelectedLanguage] = useState();
    const { categories, isLoading } = useCategories();

    useEffect(() => {
        navigation.setOptions({
            title: name ? name : 'New Product',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.label}>Product name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Product"

                />

                {/* Picker / Selector */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                    {(isLoading)
                        ? <ActivityIndicator style={styles.loader} color="#5856d6" size={35} />
                        : <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue) =>
                                setSelectedLanguage(itemValue)
                            }>
                            {
                                categories.map((category) => (
                                    <Picker.Item key={category._id} label={category.nombre} value={category._id} />
                                ))
                            }
                        </Picker>
                    }
                </View>
                <Button
                    title="Save"
                    onPress={() => { }}
                    color="#5856d6"
                />

                <View style={styles.buttonsContainer}>
                    <Button
                        title="Camera"
                        onPress={() => { }}
                        color="#5856d6"
                    />

                    <View style={styles.buttonsSeparator} />

                    <Button
                        title="Gallery"
                        onPress={() => { }}
                        color="#5856d6"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonsSeparator: {
        width: 10,
    },
    categoriesContainer: {
        paddingVertical: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
