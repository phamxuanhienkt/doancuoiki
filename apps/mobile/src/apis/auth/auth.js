// auth.js
import * as SecureStore from "expo-secure-store";

// Function to store access token
export const storeAccessToken = async (token) => {
    try {
        // Ensure token is a string
        await SecureStore.setItemAsync('access_token', token);
    } catch (error) {
        console.error('Failed to store token:', error);
    }
};

// Function to retrieve access token
export const getAccessToken = async () => {
    try {
        const storedToken = await SecureStore.getItemAsync('access_token');
        // Ensure we get a valid JSON string and parse it
        // const parsedToken = JSON.parse(storedToken || '{}');
        // return parsedToken.token || null;
        return storedToken || null;
    } catch (error) {
        console.error('Failed to parse token from SecureStore:', error);
        return null;
    }
};

//using when logout
export const clearAccessToken = async () => {
    try {
        await SecureStore.deleteItemAsync('access_token');
    } catch (error) {
        console.error('Failed to clear token:', error);
    }
};