import './index.scss';
import { useEffect } from 'react';
import { getAll } from 'services/posts';
import useFetch from 'hooks/useFetch';
import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';
import PostCreate from 'components/PostCreate';
import PostItem from 'components/PostItem';

const PostsList = () => {
    const { data, error, isLoading, request } = useFetch();

    useEffect(() => {
        request(getAll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSaved = () => {
        request(getAll);
    };

    return (
        <ul className="PostsList">
            {error && (
                <ErrorMessage message={error} />
            )}
            <PostCreate onSaved={handleSaved} />
            {isLoading && <Loading entity="posts" />}
            {data && data.map((post) => (
                <PostItem
                    key={post.id}
                    data={post}
                    onLiked={handleSaved}
                    onDeleted={handleSaved}
                />
            ))}
        </ul>
    );
};

export default PostsList;
