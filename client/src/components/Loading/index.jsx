import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ({ entity = null }) => (
    <div className="Loading">
        <FontAwesomeIcon icon={faSpinner} spin className="Loading__icon" />
        {entity && (
            <span className="Loading__text">
                Loading {entity}, please wait...
            </span>
        )}
    </div>
);

export default Loading;
