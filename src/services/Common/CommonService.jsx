import axios from "axios";
import toast from "react-hot-toast";

const API_URL = 'http://localhost:8080/api';

const notify = (message, type) => {
    type == 'success' && toast.success(message);
    type == 'error' && toast.error(message);
};

const errorHandle = (error) => {
    error.code == 'ERR_BAD_REQUEST' ? notify(error.response.data.message, 'error') : toast.error('Something wrong!\n Please try again later');
}

// get authorization token 
const getAuthToken = () => {
    return JSON.parse(localStorage.getItem('user')).authorization;
};



// Category api 

export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_URL}/vehicle-category/vehicle-categories`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// discount api 

export const getDiscount = async () => {
    try {
        const response = await axios.get(`${API_URL}/discount/current-active-discounts`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getDiscountPercentage = async () => {
    try {
        const response = await axios.get(`${API_URL}/discount/current-active-discounts`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response.data[0].percentage;
    } catch (error) {
        throw error;
    }
}

// ADD PARK API 

export const addPark = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/park/add-park`,
            data,
            {
                headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
            }
        );
        notify("successful park ", 'success')
        return response.data
    } catch (error) {
        throw error;
    }
}


