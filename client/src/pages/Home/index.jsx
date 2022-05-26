import './index.scss';
import PostsList from 'components/PostsList';
import { useAtomValue } from 'jotai';
import { isLoggedAtom } from 'stores/user';

const Home = () => {
    const isLogged = useAtomValue(isLoggedAtom);

    return (
        <div className="Home">
            <h2 className="Home__title">Welcome!</h2>
            {!isLogged && (
                <p className="Home__welcome-message">Please sign-in to see all posts.</p>
            )}
            {isLogged && <PostsList />}
        </div>
    );
};

export default Home;
