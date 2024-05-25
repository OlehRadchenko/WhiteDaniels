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
let usersConnected = [];
let deck = [];
let gameState = [];
let dealer = [];
let message = "";

const Deal = {
    user: 'user',
    hidden: 'hidden',
    dealer: 'dealer'
};
const Message = {
    bet: 'Place a Bet!',
    hitStand: 'Hit or Stand?',
    win: 'YOU WIN!',
    lose: 'YOU LOSE!',
    tie: 'PUSH!',
    blackjack: 'BLACKJACK!',
    bust: 'BUSTED!',
    surrender: 'SURRENDER!',
    error: 'Przepraszamy, wystąpił problem, środki zostaną zwrócone na konto, prosimy o kliknięcie przycisku restartu gry'
};
const GameState = {
    betTime : 'betTime',
    userTurn: 'userTurn',
    dealerTurn: 'dealerTurn',
    start: 'start'
};

const schuffleDeck = (deck) =>{
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
const generateDeck = () =>{
    let deckOnTable = [];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["T", "P", "S", "K"];
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deckOnTable.push(values[j] + "_" + types[i]);
        }
    }
    schuffleDeck(deckOnTable);
    deck.push(...deckOnTable);
}

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
    usersConnected.push({user: user, socketId: socket.id, connected: true, balance: 10000, ready: false, betValue: 0});
}

io.on('connection', (socket) => {
  console.log('Nowe połączenie websockets');
  socket.on('login', (data) => {
    console.log('Nowe logowanie');
    const user = users.find((user) => user.email === data.email_login && user.password === data.password);
    if (user) {
        addConnectedUser(socket, user);
        socket.emit('login_success', {message: 'Logowanie powiodło się pomyślnie', password_error: false, login_error: false, user: user, usersActive: usersConnected});
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
        socket.emit('register_success', {message: 'Rejestracja powiodła się pomyślnie', user: data});
    }
  });

  socket.on('newGame', () => {
    gameState = GameState.betTime;
    dealer.cards = [];
    dealer.score = 0;
    dealer.count = 0;
    usersConnected.forEach((user) => {
        //user.ready = false;
        user.PlayerCards = [];
        user.PlayerScore = 0;
        user.PlayerCount = 0;
    });
    message = '';
    deck = [];
    generateDeck();
    socket.emit('newGame_success', {server_message: 'Nowa gra została rozpoczeta', deck: deck, usersActive: usersConnected, gameState: gameState, message: message, dealer: dealer});
  });

  socket.on('betPlaced', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    let startGame = false;
    usersConnected[index].balance -= data.betValue;
    usersConnected[index].ready = true;
    usersConnected[index].betValue = data.betValue;

    if(usersConnected.filter((user) => user.ready === true).length === usersConnected.length){
        gameState = GameState.start;
        startGame = true;
    }
    socket.emit('betPlaced_success', {message: 'Stawka postawiona: ', user: usersConnected[index], usersActive: usersConnected, startGame: startGame});
  });

  socket.on('disconnect', () => {
    console.log('Połączenie websockets zostało rozlączone');
    const index = usersConnected.findIndex((user) => user.user === socket.user); //Tu socket.user jest undefined, ale jak zrobić F5 na kliencie to nagle zadziała
    if (index !== -1) {
        usersConnected.splice(index, 1);
    }
    console.log(usersConnected);
  });
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