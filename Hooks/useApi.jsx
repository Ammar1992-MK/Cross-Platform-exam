import { useState, useEffect } from 'react';
const useApi = (apiFunction) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function reload() {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
            setData(await apiFunction());
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(reload, []);
    return { loading, error, data };
}

export default useApi;