import { useState } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const request = async (service, args) => {
        setIsLoading(true);
        setError(null);

        try {
            const responseData = await service(args);
            setData(responseData);
            return responseData;
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }

        return null;
    };

    return { data, error, isLoading, request };
};

export default useFetch;
