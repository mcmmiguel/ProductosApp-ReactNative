import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.50.60:8080/api';

const cafeAPI = axios.create({ baseURL });

cafeAPI.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    }

);

export default cafeAPI;
