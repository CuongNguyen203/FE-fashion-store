import axios from "axios";

const productUrl = "http://localhost:8080";

const productAPI = axios.create({
    baseURL: productUrl + '/api/v1',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
    }
});
//get all
export const getAllProducts = async () => {
    try {
        const response = await productAPI.get('/product');
        return await response?.data;
    } catch (error) {
        return error?.response;
    }
};
//search
export const getSearchProducts = async (query) => {
    try {
        const response = await productAPI.get(`/product/search/${query}`);
        return response?.data;
    } catch (error) {
        return error?.response;
    }

}
// filter ?
export const getProductsFilter = async (filter) => {
    try {
        const filteredParams = Object.fromEntries(
            Object.entries(filter).filter(([key, value]) => value !== null)
        );
        const filterJson = JSON.stringify(filteredParams);
        const response = await productAPI.get('/product/' + filterJson);
        console.log(response?.data);
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// related ?
export const getRelatedProduct = async (productId) => {
    try {
        const response = await productAPI.get(`/product/related/${productId}`);
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// hot product
export const getHotProducts = async () => {
    try {
        const response = await productAPI.get(`/product/hot`);
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// recommend ?
export const getRecommendProducts = async (productId) => {
    try {
        const response = await productAPI.get(`/product/recommend/${productId}`);
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// get product
export const getProduct = async (productId) => {
    try {
        const response = await productAPI.get(`/product/${productId}`);
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// get review
export const getReview = async (productId) => {
    try {
        const response = await productAPI.get(`/product/review/${productId}`);
        return response?.data?.data;
    } catch (error) {
        return error?.response;
    }
}
// create review
export const createReview = async (payload) => {
    try {
        const response = await productAPI.post(`/product/review`, payload)
        return response?.data;
    } catch (error) {
        return error?.response;
    }
}
// cart
export const getCartItem = async (cartId) => {
    try {
        const response = await productAPI.get('/product/cart/' + cartId)
        return response?.data;
    } catch (error) {
        return error?.response
    }
}
