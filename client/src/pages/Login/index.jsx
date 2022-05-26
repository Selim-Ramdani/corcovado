import './index.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAtomValue } from 'jotai';
import { userIdAtom } from 'stores/user';
import Input from 'components/Input';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import useLogin from 'hooks/useLogin';

const Login = () => {
    const navigate = useNavigate();
    const userId = useAtomValue(userIdAtom);

    useEffect(() => {
        if (userId !== null) {
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const { handleLogin, isLoading, error } = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        const identifier = event.target.email.value;
        const password = event.target.password.value;
        handleLogin(identifier, password);
    };

    return (
        <form className="Login" onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            <p>
                Email:<br />
                <Input type="text" name="email" />
            </p>
            <p>
                Password:<br />
                <Input type="password" name="password" />
            </p>
            <p>
                <Button isSubmit isLoading={isLoading}>Lets GO!</Button>
            </p>
            {error && <ErrorMessage message={error} />}
        </form>
    );
};

export default Login;
