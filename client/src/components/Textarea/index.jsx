import './index.scss';

const Textarea = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <textarea className="Textarea" {...props} autoComplete="off" />
);

export default Textarea;
