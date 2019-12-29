import axios from 'axios';

const baseUrl = "https://localhost:44349";

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
