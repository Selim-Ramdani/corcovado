import './index.scss';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { create } from 'services/posts';
import { userIdAtom } from 'stores/user';
import useFetch from 'hooks/useFetch';
import Textarea from 'components/Textarea';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';

const PostCreate = ({ onSaved }) => {
    const userId = useAtomValue(userIdAtom);
    const [text, setText] = useState('');
    const { request, isLoading, error } = useFetch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const savedData = await request(create, { text, user: userId });
        if (!savedData) {
            return;
        }
        onSaved();
        setText('');
    };

    const handleChangeText = (event) => {
        const { value } = event.target;
        setText(value);
    };

    return (
        <form className="PostCreate" onSubmit={handleSubmit}>
            <Textarea
                name="text"
                value={text}
                onChange={handleChangeText}
                placeholder="Write a new post here!"
                rows={4}
            />
            <Button isSubmit isLoading={isLoading}>Post</Button>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default PostCreate;
