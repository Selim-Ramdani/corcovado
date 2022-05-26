import './index.scss';
import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { userIdAtom } from 'stores/user';
import Button from 'components/Button';
import Input from 'components/Input';
import Textarea from 'components/Textarea';

const ProfileForm = ({ data, onCancel, onSave, isSaving }) => {
    const currentUserId = useAtomValue(userIdAtom);
    const { id, username, email, description } = data;
    const isOwnProfile = id === currentUserId;

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const toSave = Object.fromEntries(formData);
        onSave(toSave);
    }, [onSave]);

    if (!isOwnProfile) {
        return null;
    }

    return (
        <form className="ProfileForm" onSubmit={handleSubmit}>
            <label htmlFor="name" className="ProfileForm__field">
                <p className="ProfileForm__field__label">Name</p>
                <Input
                    type="text"
                    name="username"
                    id="name"
                    defaultValue={username}
                />
            </label>
            <label htmlFor="email" className="ProfileForm__field">
                <p className="ProfileForm__field__label">E-mail</p>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={email}
                />
            </label>
            <label htmlFor="description" className="ProfileForm__field">
                <p className="ProfileForm__field__label">Description</p>
                <Textarea
                    name="description"
                    id="description"
                    rows={10}
                    defaultValue={description}
                />
            </label>
            <Button onClick={onCancel}>Cancel</Button>
            <Button isSubmit isLoading={isSaving}>Save</Button>
        </form>
    );
};

export default ProfileForm;
