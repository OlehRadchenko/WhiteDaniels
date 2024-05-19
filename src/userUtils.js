import axios from 'axios';

const BASE_URL = 'http://localhost:3050';

const readUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Error reading users data:', error);
        throw error;
    }
};

const addUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, user);
        console.log('User added successfully:', response.data);
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        const users = await readUsers();
        return users.find(user => user.email === email);
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

export { addUser, findUserByEmail };
