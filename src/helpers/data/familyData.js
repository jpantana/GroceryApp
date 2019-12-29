import axios from 'axios';

const baseUrl = "https://localhost:44349";

const getMyFamily = familyId => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/user/myfamily/${familyId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const createFamily = familyName => axios.post(`${baseUrl}/family`, familyName);

export default { getMyFamily, createFamily }
