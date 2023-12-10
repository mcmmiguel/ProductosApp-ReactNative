/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useCategories, useForm } from '../hooks';
import { ProductsContext } from '../context';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id = '', name = '' } = route.params;
    const { loadProductById, updateProduct, addProduct } = useContext(ProductsContext);
    const { categories, isLoading } = useCategories();
    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: '',
    });

    useEffect(() => {
        navigation.setOptions({
            title: nombre ? nombre : 'No product name',
        });
    }, [nombre]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        if (id.length === 0) { return; }

        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre,
        });
    };

    const saveOrUpdate = () => {
        if (id.length > 0) {
            updateProduct(categoriaId, nombre, id);
        } else {
            const tempCategoriaId = categoriaId || categories[0]._id;
            addProduct(tempCategoriaId, nombre);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.label}>Product name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="PESIPEPSI"
                    value={nombre}
                    onChangeText={(value) => onChange(value, 'nombre')}
                />

                {/* Picker / Selector */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                    {(isLoading)
                        ? <ActivityIndicator style={styles.loader} color="#5856d6" size={35} />
                        : <Picker
                            selectedValue={categoriaId}
                            onValueChange={(itemValue) => onChange(itemValue, 'categoriaId')}
                        >
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
                    onPress={saveOrUpdate}
                    color="#5856d6"
                />

                {id.length > 0 &&
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
                }

                {
                    (img.length > 0) &&
                    <Image
                        source={{ uri: img }}
                        style={styles.image}
                    />
                }

                {/* TODO Mostrar imagen temporal */}
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
    image: {
        marginTop: 20,
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
});
