import axios from 'axios';

const baseUrl = "https://localhost:44349";

const getAllItems = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/item`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const getUsersItems = groceryStrId => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/item/${groceryStrId}`)
        .then(res => {
            resolve(res.data);
        })
        .catch(reject);
});

const addItem = newItem => axios.post(`${baseUrl}/item`, newItem);

const deleteItem = itm => axios.delete(`${baseUrl}/item/${itm}`);

export default { getUsersItems, getAllItems, addItem, deleteItem }
