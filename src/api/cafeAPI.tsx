import axios from 'axios';

const baseURL = 'http://192.168.50.60:8080/api';

const cafeAPI = axios.create({ baseURL });

export default cafeAPI;
