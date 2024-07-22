import request from "../axios";
import { storeAccessToken } from "./auth";

export const login = async (payload) => {
    const { data } = await request({
        url: 'login/',
        method: 'POST',
        data: payload,
    });
    if (data.access) {
        await storeAccessToken(data.access);
    }
    return data;
};

export const register = async (payload) => {
    const { data } = await request({
        url: "register/",
        method: "POST",
        data: payload,
    });
    if (data.access) {
        await storeAccessToken(data.access);
    }
    return data;
};

// export const profile = async () => {
//     const { data } = await request({
//         url: '/my-profile',
//         method: 'GET',
//     });
//     return data;
// };