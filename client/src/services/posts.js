import Cookies from 'js-cookie';
import { API_BASE_URL } from 'config';
import throwErrorMessage from 'utils/throwErrorMessage';

const getAll = async () => {
    const response = await fetch(`${API_BASE_URL}/posts?_sort=created_at:desc`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const create = async (postData) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`,
        },
        body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const like = async (infos) => {
    // - All this logic should be done server-side, into API...
    const { id, userHasLiked, likesCount, likedUsers, currentUserId } = infos;

    const newCount = userHasLiked ? likesCount - 1 : likesCount + 1;
    let newUsersLikes = [];
    if (userHasLiked) {
        newUsersLikes = likedUsers
            .filter((likedUser) => likedUser.id !== currentUserId)
            .map(({ id: userId }) => userId);
    } else {
        newUsersLikes = [...likedUsers.map(({ id: userId }) => userId), currentUserId];
    }

    const likeData = {
        like: newCount,
        likedUsers: newUsersLikes,
    };

    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth-token')}`,
        },
        body: JSON.stringify(likeData),
    });

    const data = await response.json();

    if (response.status !== 200) {
        throwErrorMessage(data);
    }
    return data;
};

const remove = async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
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

export { getAll, create, like, remove };
