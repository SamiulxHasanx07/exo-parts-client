import axios from "axios";
import { useQuery } from "react-query";

const useGetData = (url, name) => {
    const getData = () => {
        return axios.get(`${url}`)
    }
    const { data, isLoading, refetch } = useQuery(`${name}`, getData)
    return { data, isLoading, refetch };
};

export default useGetData;