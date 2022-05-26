import Cookies from 'js-cookie';
import { API_BASE_URL } from 'config';
import throwErrorMessage from 'utils/throwErrorMessage';

const login = async ({ identifier, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const register = async ({ username, email, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const getOne = async (id = null) => {
    const response = await fetch(`${API_BASE_URL}/users/${id || 'me'}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`,
        },
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const editSelf = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`,
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

export { login, register, getOne, editSelf };
