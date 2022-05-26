import './index.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { userIdAtom } from 'stores/user';
import { register } from 'services/user';
import useFetch from 'hooks/useFetch';
import useLogin from 'hooks/useLogin';
import Input from 'components/Input';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';

const Signup = () => {
    const navigate = useNavigate();
    const userId = useAtomValue(userIdAtom);
    const { isLoading, data, error, request } = useFetch();
    const { forceLogin } = useLogin();

    useEffect(() => {
        if (userId !== null) {
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const createUserData = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };
        request(register, createUserData);
    };

    useEffect(() => {
        if (data && data.jwt && data.user) {
            forceLogin(data.user);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <form className="Signup" onSubmit={handleSubmit}>
            <h2>Create new account</h2>
            <p>
                Your name:<br />
                <Input type="text" name="username" />
            </p>
            <p>
                Your e-mail:<br />
                <Input type="email" name="email" />
            </p>
            <p>
                Choose a password:<br />
                <Input type="password" name="password" />
            </p>
            <p>
                <Button isSubmit isLoading={isLoading}>Create me</Button>
            </p>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default Signup;
