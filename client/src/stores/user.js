import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { COOKIE_NAME } from 'config';

const getCookieUserId = () => {
    try {
        const jwt = Cookies.get(COOKIE_NAME);
        const { id, exp } = jwtDecode(jwt);
        const now = Date.now() / 1000;
        return (exp >= now) ? id : null;
    } catch (err) {
        return null;
    }
};

const userIdAtom = atom(getCookieUserId());
const userNameAtom = atomWithStorage('miniSocialNetwork_userName', '');
const isLoggedAtom = atom((get) => get(userIdAtom) !== null);

export {
    userIdAtom,
    userNameAtom,
    isLoggedAtom,
};
