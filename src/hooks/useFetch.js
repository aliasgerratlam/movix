import React, { useEffect, useState } from "react"
import { FetchDataFromApi } from "../utlis/api";

const useFetch = (url) => {
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('Loading...');
        setData(null);
        setError(null);

        FetchDataFromApi(url)
        .then((res) => {
            setLoading(false);
            setData(res);
        }).catch((err) => {
            setLoading(false);
            setError(err, 'Something went wrong');
        });

    }, [url]);

    return {loading, data, error}; 
}

export default useFetch;