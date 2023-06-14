import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmQzMDA1ODNmODc0MjMzOWFlZGU1NTM1ZDU2NzM3YyIsInN1YiI6IjYzYjY4MzI1YjlhMGJkMDJhYjE5NTBiYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9PwLQZtZkSNkDzFXJ7W_X1WcKcKhgDBbNo2r0bf0hJM";

const headers = {
    Authorization: 'bearer ' + TMBD_TOKEN
};

export const FetchDataFromApi = async (url,params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {headers, params});
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};