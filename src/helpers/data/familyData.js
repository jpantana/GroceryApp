import axios from 'axios';
import keys from '../keys/apiKeys.json';

const { baseUrl } = keys.connectionString;

const getMyFamily = familyId => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/myfamily/${familyId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const createFamily = familyName => axios.post(`${baseUrl}/family`, familyName);

export default { getMyFamily, createFamily }
