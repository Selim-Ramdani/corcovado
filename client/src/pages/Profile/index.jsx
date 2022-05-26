import './index.scss';
import { useEffect, useCallback, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useParams } from 'react-router-dom';
import { getOne, editSelf } from 'services/user';
import { userIdAtom } from 'stores/user';
import useFetch from 'hooks/useFetch';
import ErrorMessage from 'components/ErrorMessage';
import Loading from 'components/Loading';
import Button from 'components/Button';
import ProfileDetails from './Details';
import ProfileForm from './Form';

const Profile = () => {
    const { userId } = useParams();
    const currentUserId = useAtomValue(userIdAtom);
    const { request, data, isLoading, error } = useFetch();
    const { request: save, isLoading: isSaving, error: saveError } = useFetch();
    const [editMode, setEditMode] = useState(false);

    const isOwnProfile = !userId;
    const title = isOwnProfile ? 'My profile' : `Profile of ${data?.username || '...'}`;

    useEffect(() => {
        request(getOne, userId || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, currentUserId]);

    const handleSave = useCallback(async (saveData) => {
        if (!isOwnProfile) {
            return;
        }

        await save(editSelf, saveData);
        await request(getOne, userId || null);
        setEditMode(false);
    }, [isOwnProfile, request, save, userId]);

    return (
        <div className="Profile">
            <h2 className="Profile__title">{title}</h2>
            {isLoading && <Loading entity="user infos" />}
            {(error || saveError) && <ErrorMessage message={error || saveError} />}
            {!editMode && data && (
                <>
                    <ProfileDetails data={data} />
                    {isOwnProfile && (
                        <Button onClick={() => { setEditMode(true); }}>
                            Edit my informations
                        </Button>
                    )}
                </>
            )}
            {editMode && data && (
                <ProfileForm
                    data={data}
                    isSaving={isSaving}
                    onCancel={() => { setEditMode(false); }}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Profile;
