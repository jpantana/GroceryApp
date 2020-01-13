import axios from 'axios';
import keys from '../keys/apiKeys.json';

const { baseUrl } = keys.connectionString;

const getMyGroceryList = familyId => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/grocerylist/${familyId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const makeGroceryList = newGroceryListObj => axios.post(`${baseUrl}/grocerylist`, newGroceryListObj);

const deleteList = deleteId => axios.delete(`${baseUrl}/grocerylist/${deleteId}`);

export default { getMyGroceryList, makeGroceryList, deleteList }
