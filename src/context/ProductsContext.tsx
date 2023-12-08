import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces';
import cafeAPI from '../api/cafeAPI';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<void>;
    updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>; //TODO cambiar any
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProducts = async () => {
        const resp = await cafeAPI.get<ProductsResponse>('/productos?limite=50');
        setProducts([...products, ...resp.data.productos]);
        console.log(resp.data.productos);
    };

    const addProduct = async (categoryId: string, productName: string) => {
        throw new Error('Not implemented');
    };

    const updateProduct = async (categoryId: string, productName: string, productId: string) => {
        throw new Error('Not implemented');
    };

    const deleteProduct = async (id: string) => {
        throw new Error('Not implemented');
    };

    const loadProductById = async (id: string) => {
        throw new Error('Not implemented');
    };

    const uploadImage = async (data: any, id: string) => {
        throw new Error('Not implemented');
    };


    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
