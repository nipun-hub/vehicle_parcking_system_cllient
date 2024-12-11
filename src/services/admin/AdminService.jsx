import { Description } from "@mui/icons-material";
import axios from "axios";

// notification section end
const notify = (message, type) => {
    type == 'success' && toast.success(message);
    type == 'error' && toast.error(message);
};

const errorHandle = (error) => {
    error.code == 'ERR_BAD_REQUEST' ? notify(error.response.data.message, 'error') : toast.error('Something wrong!\n Please try again later');
}


// api common url 
const API_URL = 'http://localhost:8080/api';

// get authorization token 
const getAuthToken = () => {
    return JSON.parse(localStorage.getItem('user')).authorization; // Adjust the key if needed
};


//  category api 

export const addVehicleCategory = async (data) => {
    try {
        const responseCategory = await axios.post(`${API_URL}/vehicle-category/create-category`,
            { categoryName: data.categoryName, description: data.description },
            {
                headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
            }
        );
        if (responseCategory) {
            const responsePrice = await axios.post(`${API_URL}/pricing/add-price`,
                {
                    "pricePerHour": parseFloat(data.pricePerHour),
                    "vehicleCategory": {
                        "id": responseCategory.data.id
                    }
                },
                {
                    headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
                }
            );
        }
        return responseCategory.data
    } catch (error) {
        throw error;
    }
}

export const updateVehicleCategory = async (data) => {
    try {
        const responseCategory = await axios.put(`${API_URL}/vehicle-category/update/${data.id}`,
            { categoryName: data.categoryName, description: data.description },
            {
                headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
            }
        );
        if (responseCategory) {
            console.log(responseCategory.data)
            const responsePrice = await axios.post(`${API_URL}/pricing/add-price`,
                {
                    "pricePerHour": parseFloat(data.pricePerHour),
                    "vehicleCategory": {
                        "id": responseCategory.data.id
                    }
                },
                {
                    headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
                }
            );
        }
        return responseCategory.data
    } catch (error) {
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/vehicle-category/delete/${id}`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


// discount api 

export const addDiscount = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/discount/add-discount`,
            {
                "description": data.description,
                "percentage": data.percentage,
                "startDate": data.startDate,
                "endDate": data.endDate
            },
            {
                headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
            }
        );
        return response.data
    } catch (error) {
        throw error;
    }
}

export const updateDiscount = async (data) => {
    try {
        const response = await axios.put(`${API_URL}/discount/update/${data.id}`,
            {
                "description": data.description,
                "percentage": data.percentage,
                "startDate": data.startDate,
                "endDate": data.endDate
            },
            {
                headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
            }
        );
        return response.data
    } catch (error) {
        throw error;
    }
}

export const deleteDiscount = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/discount/delete/${id}`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// piking api 

export const getParkingRequest = async () => {
    try {
        const response = await axios.get(`${API_URL}/park/search-parks`, {
            headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
        });
        return response;
    } catch (error) {
        throw error;
    }
}


// // order 


// export const getParkData = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/park/search-parks`, {
//             headers: { Authorization: `${JSON.parse(localStorage.getItem('user')).authorization}` }
//         });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// }
