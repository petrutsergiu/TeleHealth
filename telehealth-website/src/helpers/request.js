import axios from 'axios';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');

    return token ? `Bearer ${token}` : undefined;
};

const handleResponse = (response) => {
    console.log(response);

    if (!response.data) {
        throw new Error('err');
    }

    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

const handleUrl = (url,port) => `http://localhost:${port}/${url}`; 

export default ({
    method,
    url,
    data,
    port,
    ...rest
}) => axios({
    method,
    url: handleUrl(url,port),
    data,
    headers: {
        ...(rest.headers || {}),
        Authorization: getAuthHeader(),
    },
    ...rest,
}).then(handleResponse);
