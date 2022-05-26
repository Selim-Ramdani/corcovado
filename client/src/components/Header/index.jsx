import './index.scss';
import { useAtomValue } from 'jotai';
import { NavLink } from 'react-router-dom';
import { isLoggedAtom, userNameAtom } from 'stores/user';
import Button from 'components/Button';
import useLogout from 'hooks/useLogout';

const Header = () => {
    const isLogged = useAtomValue(isLoggedAtom);
    const userName = useAtomValue(userNameAtom);
    const handleLogout = useLogout();

    return (
        <header className="Header">
            <h1 className="Header__title">
                Mini React Social Network
            </h1>
            <nav className="Header__nav">
                <NavLink to="/">Home</NavLink>
                {isLogged && (
                    <NavLink to="/profile">My profile</NavLink>
                )}
            </nav>
            <div className="Header__user">
                {!isLogged && (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Create an account</NavLink>
                    </>
                )}
                {isLogged && (
                    <>
                        <span>Hello {userName}!</span>
                        <Button type="button" onClick={handleLogout}>
                            Log out
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
