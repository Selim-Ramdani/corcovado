import { useCallback, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from 'config';
import { login } from 'services/user';
import useFetch from 'hooks/useFetch';
import { userIdAtom, userNameAtom } from 'stores/user';

const useLogin = () => {
    const setUserId = useSetAtom(userIdAtom);
    const setUserName = useSetAtom(userNameAtom);

    const { request, data, isLoading, error } = useFetch();

    const handleLogin = useCallback((identifier, password) => {
        request(login, { identifier, password });
    }, [request]);

    const forceLogin = useCallback((userData) => {
        if (!userData && !userData.id) {
            return;
        }

        setUserId(userData.id);
        setUserName(userData.username);
    }, [setUserId, setUserName]);

    useEffect(() => {
        if (!data) {
            return;
        }

        setUserId(data.user.id);
        setUserName(data.user.username);
        Cookies.set(COOKIE_NAME, data.jwt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { handleLogin, forceLogin, isLoading, error };
};

export default useLogin;
