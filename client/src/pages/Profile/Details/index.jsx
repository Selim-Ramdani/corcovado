import './index.scss';
import { useAtomValue } from 'jotai';
import { userIdAtom } from 'stores/user';

const ProfileDetails = ({ data }) => {
    const currentUserId = useAtomValue(userIdAtom);
    const { id, username, email, description } = data;
    const isOwnProfile = id === currentUserId;

    return (
        <dl className="ProfileDetails">
            <dt className="ProfileDetails__title">User name</dt>
            <dd className="ProfileDetails__data">{username}</dd>
            {isOwnProfile && (
                <>
                    <dt className="ProfileDetails__title">E-mail</dt>
                    <dd className="ProfileDetails__data">{email}</dd>
                </>
            )}
            <dt className="ProfileDetails__title">Description</dt>
            <dd className="ProfileDetails__data">{description || <em>--</em>}</dd>
        </dl>
    );
};

export default ProfileDetails;
