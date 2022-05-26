import './index.scss';

const Input = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input className="Input" {...props} autoComplete="off" />
);

export default Input;
