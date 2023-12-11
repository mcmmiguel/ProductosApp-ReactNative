/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useCategories, useForm } from '../hooks';
import { ProductsContext } from '../context';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route, navigation }: Props) => {

    const { id = '', name = '' } = route.params;
    const { loadProductById, updateProduct, addProduct, uploadImage } = useContext(ProductsContext);
    const { categories, isLoading } = useCategories();
    const { _id, categoriaId, nombre, img, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: '',
    });
    const [tempUri, setTempUri] = useState<string>();

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

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            updateProduct(categoriaId, nombre, id);
        } else {
            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await addProduct(tempCategoriaId, nombre);
            onChange(newProduct._id, '_id');
        }
    };

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel === true) { return; }
            if (!resp.assets) { return; }
            setTempUri(resp.assets[0].uri);
            uploadImage(resp, _id);
        });
    };

    const takePhotoFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5,
        }, (resp) => {
            if (resp.didCancel === true) { return; }
            if (!resp.assets) { return; }
            setTempUri(resp.assets[0].uri);
            uploadImage(resp, _id);
        });
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.label}>Product name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Product"
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

                {_id.length > 0 &&
                    <View style={styles.buttonsContainer}>
                        <Button
                            title="Camera"
                            onPress={takePhoto}
                            color="#5856d6"
                        />

                        <View style={styles.buttonsSeparator} />

                        <Button
                            title="Gallery"
                            onPress={takePhotoFromGallery}
                            color="#5856d6"
                        />
                    </View>
                }

                {
                    (img.length > 0 && !tempUri) &&
                    <Image
                        source={{ uri: img }}
                        style={styles.image}
                    />
                }

                {/* TODO Mostrar imagen temporal */}
                {
                    (tempUri) &&
                    <Image
                        source={{ uri: tempUri }}
                        style={styles.image}
                    />
                }
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
