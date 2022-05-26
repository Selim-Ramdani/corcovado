const throwErrorMessage = (errorData) => {
    if (!errorData || !errorData.message) {
        throw new Error('Unknown error.');
    }
    if (!Array.isArray(errorData.message)) {
        throw new Error(errorData.message);
    }
    throw new Error(errorData.message[0].messages[0].message || 'Unknown error.');
};

export default throwErrorMessage;
