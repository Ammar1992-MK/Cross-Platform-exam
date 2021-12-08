import { useState, useEffect } from 'react';
const useApi = (apiFunction) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [lastUpdated, setLastUpdated] = useState();

    const getCurrentDateAndTime = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        setLastUpdated(date + ' ' + time);
    }

    async function reload() {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
            setData(await apiFunction());
            getCurrentDateAndTime();
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(reload, []);
    return { reload, loading, error, lastUpdated, data };
}

export default useApi;