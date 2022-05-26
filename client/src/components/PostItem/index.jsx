import './index.scss';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userNameAtom } from 'stores/user';
import LikeButton from 'components/LikeButton';
import DeletePostButton from 'components/DeletePostButton';

const PostItem = ({ data, onLiked, onDeleted }) => {
    const { id: postId, text, user, like, likedUsers, created_at: createdAt } = data;
    const { id: userId, username } = user;
    const currentUserName = useAtomValue(userNameAtom);
    const isMyOwnPost = currentUserName === username;

    const humanDate = useMemo(() => {
        const date = new Date(createdAt);
        const formatStyle = { dateStyle: 'long', timeStyle: 'short' };
        return new Intl.DateTimeFormat('fr-FR', formatStyle).format(date);
    }, [createdAt]);

    const userLink = username ? <Link to={`/users/${userId}`}>{username}</Link> : '???';

    return (
        <li className="PostItem">
            <div className="PostItem__header">
                <div className="PostItem__header__author">
                    Written by {isMyOwnPost ? 'myself' : userLink}
                </div>
                <div className="PostItem__header__actions">
                    {isMyOwnPost && (
                        <DeletePostButton postData={data} onDeleted={onDeleted} />
                    )}
                </div>
                <div className="PostItem__header__date">
                    {humanDate}
                </div>
                <div className="PostItem__header__likes">
                    {!isMyOwnPost && (
                        <LikeButton
                            postId={postId}
                            likesCount={like}
                            likedUsers={likedUsers}
                            onLiked={onLiked}
                        />
                    )}
                    {isMyOwnPost && <span>{like} likes</span>}
                </div>
            </div>
            <p className="PostItem__text">
                {text}
            </p>
        </li>
    );
};

export default PostItem;
