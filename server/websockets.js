const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
});

const users = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const usersConnected = [];

const addUser = (email, password, imie, nazwisko, dataUro, kraj, miasto, adres, kod_pocztowy, waluta, nr_tel) => {
    users.push({email, password, imie, nazwisko, dataUro, kraj, miasto, adres, kod_pocztowy, waluta, nr_tel});
    saveData(users);
};

const userExists = (email) => {
    return users.some((user) => user.email === email);
};

const saveData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data));
};

const addConnectedUser = (socket, user) => {
    socket.user = user;
    usersConnected.push({user: user, socketId: socket.id});
}

io.on('connection', (socket) => {
  console.log('Nowe połączenie websockets');
  socket.on('login', (data) => {
    console.log('Nowe logowanie');
    const user = users.find((user) => user.email === data.email_login && user.password === data.password);
    if (user) {
        addConnectedUser(socket, user);
        socket.emit('login_success', {message: 'Logowanie powiodło się pomyślnie', password_error: false, login_error: false, username: user.imie, usersActive: usersConnected});
    } else if(users.find((user) => user.email === data.email_login)){
        socket.emit('login_error', {message: 'Nieprawidłowe hasło!', passwordError: true, loginError: false});
    } else {
        socket.emit('login_error', {message: 'Nieprawidłowe dane!', passwordError: true, loginError: true});
    }
  });

  socket.on('register', (data) => {
    if (userExists(data.email)) {
        socket.emit('register_error', {message: 'Użytkownik już istnieje'});
    } else {
        addUser(data.email, data.password, data.imie, data.nazwisko, data.dataUro, data.kraj, data.miasto, data.adres, data.kod_pocztowy, data.waluta, data.nr_tel);
        socket.emit('register_success', {message: 'Rejestracja powiodła się pomyślnie', username: data.imie});
    }
  });

  socket.on('disconnect', () => {
    console.log('Połączenie websockets zostało rozlączone');
    const index = usersConnected.findIndex((user) => user.user === socket.user);
    if (index !== -1) {
        usersConnected.splice(index, 1);
    }
    console.log(usersConnected);
  });

  /*socket.on('go_back', () => {
    console.log('Powracam na start');
    const index = usersConnected.findIndex((user) => user.user === socket.user);
    if (index !== -1) {
        usersConnected.splice(index, 1);
    }
    console.log(usersConnected);
  });*/
});

// Uruchom serwer
const port = 5000;
server.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});



/*const ws = require('ws');

const wss = new ws.Server({port: 5000}, () => {
    console.log("server started on port 5000");
});
//ŻEBY DZIAŁAŁO TRZEBA W FOLDERZE server zrobić: npm init -y, po czym zainstalować: npm i ws nodemon express socket.io, i odpalić serwer za pomocą npm start
wss.on('connection', function conection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch (message.type) {
            case "connection":
                broadcastMessage(message);
                break;
            case "message":
                broadcastMessage(message);
                break;
            case "closed":
                broadcastMessage(message);
                break;
            case "betPlaced":
                broadcastMessage(message);
                break;
            default:
                break;
        }
    });
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    });
}*/