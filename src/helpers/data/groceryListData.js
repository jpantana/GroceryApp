import axios from 'axios';

const baseUrl = "https://localhost:44349";

const getMyGroceryList = userId => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/grocerylist/${userId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const makeGroceryList = newGroceryListObj => axios.post(`${baseUrl}/grocerylist`, newGroceryListObj);

const deleteList = deleteId => axios.delete(`${baseUrl}/grocerylist/${deleteId}`);

export default { getMyGroceryList, makeGroceryList, deleteList }
