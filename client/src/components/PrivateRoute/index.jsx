import { useAtomValue } from 'jotai';
import { Navigate } from 'react-router-dom';
import { isLoggedAtom } from 'stores/user';

const PrivateRoute = ({ element }) => {
    const isLogged = useAtomValue(isLoggedAtom);

    return isLogged ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
