import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from 'config';
import { userIdAtom, userNameAtom } from 'stores/user';

const useLogout = () => {
    const setUserId = useSetAtom(userIdAtom);
    const setUserName = useSetAtom(userNameAtom);

    const handleLogout = useCallback(() => {
        setUserId(null);
        setUserName(RESET);

        Cookies.remove(COOKIE_NAME);
    }, [setUserId, setUserName]);

    return handleLogout;
};

export default useLogout;
