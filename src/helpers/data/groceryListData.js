import axios from 'axios';

const baseUrl = "https://sweetcarts.azurewebsites.net";
// const baseUrl = "https://localhost:5001";
// const baseUrl = "https://localhost:44349";

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
