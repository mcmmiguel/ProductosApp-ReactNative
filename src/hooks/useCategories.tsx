import { useState, useEffect } from 'react';
import cafeAPI from '../api/cafeAPI';
import { Categoria, CategoriesResponse } from '../interfaces';

export const useCategories = () => {

    const [categories, setCategories] = useState<Categoria[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const resp = await cafeAPI.get<CategoriesResponse>('/categorias');
        setCategories(resp.data.categorias);
        setIsLoading(false);
    };

    return {
        categories,
        isLoading,
    };
};
