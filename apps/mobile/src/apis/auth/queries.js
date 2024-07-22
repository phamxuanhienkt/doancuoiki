import { useQuery } from "react-query";
import { profile } from "./request";

export const useUSer = (option = {}) => {
    const { data, ...rest } = useQuery(['/me'], profile, {
        ...option,
    });
    return { user: data, ...rest, isLogin: !!data }
}