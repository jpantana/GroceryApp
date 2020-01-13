import axios from 'axios';
import keys from '../keys/apiKeys.json';

const { baseUrl } = keys.connectionString;

const sendInvite = newInvite => axios.post(`${baseUrl}/invitation`,  newInvite);

const getInvites = id => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/invitation/${id}`)
        .then(resp => resolve(resp.data))
        .catch(reject);
});

const deleteInvitation = id => axios.delete(`${baseUrl}/invitation/${id}`);

export default {
    sendInvite,
    getInvites,
    deleteInvitation,
}
