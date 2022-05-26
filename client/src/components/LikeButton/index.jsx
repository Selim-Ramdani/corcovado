import { useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { like } from 'services/posts';
import { userIdAtom } from 'stores/user';
import useFetch from 'hooks/useFetch';
import Button from 'components/Button';

const LikeButton = ({ postId, likesCount, likedUsers, onLiked }) => {
    const currentUserId = useAtomValue(userIdAtom);
    const { request, isLoading } = useFetch(true);

    const userHasLiked = useMemo(() => (
        likedUsers.some((likedUser) => likedUser.id === currentUserId)
    ), [likedUsers, currentUserId]);

    const handleClickLike = async () => {
        const data = await request(like, {
            id: postId,
            userHasLiked,
            likesCount,
            likedUsers,
            currentUserId,
        });
        if (data) {
            onLiked();
        }
    };

    return (
        <Button onClick={handleClickLike} isLoading={isLoading}>
            {userHasLiked && <FontAwesomeIcon icon={faHeart} />} {likesCount} likes
        </Button>
    );
};

export default LikeButton;
