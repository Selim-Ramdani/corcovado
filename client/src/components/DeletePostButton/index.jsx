import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { remove } from 'services/posts';
import { userIdAtom } from 'stores/user';
import useFetch from 'hooks/useFetch';
import Button from 'components/Button';

const DeletePostButton = ({ postData, onDeleted }) => {
    const currentUserId = useAtomValue(userIdAtom);
    const { request, isLoading: isDeleting } = useFetch(true);
    const { id, user } = postData;

    const handleDelete = useCallback(async () => {
        const data = await request(remove, id);
        if (data) {
            onDeleted();
        }
    }, [request, id, onDeleted]);

    if (currentUserId !== user.id) {
        return null;
    }

    return (
        <Button onClick={handleDelete} isLoading={isDeleting}>
            <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
    );
};

export default DeletePostButton;
