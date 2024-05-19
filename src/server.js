const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// OTWORZ serwer w CMD: node server.js

const app = express();
const PORT = 3050;

const usersFilePath = path.join(__dirname, 'users.json');

app.use(cors());
app.use(bodyParser.json());

// Znajdz wszystkie dane userow
app.get('/users', (req, res) => {
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading users data');
            return;
        }

        const users = JSON.parse(data);
        res.json(users);
    });
});

// Dodaj usera
app.post('/users', (req, res) => {
    const newUser = req.body;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading users data');
            return;
        }

        const users = JSON.parse(data);
        users.push(newUser);

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error writing user data');
                return;
            }

            res.status(201).send('User added successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
