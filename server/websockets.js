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
let gameState = '';
let dealer = {
    cards: [],
    score: 0,
    count: 0
};

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
    error: 'Przepraszamy, wystąpił problem, środki zostaną zwrócone na konto, prosimy o kliknięcie przycisku restartu gry',
    wait: 'Poczekaj na swoją kolej!'
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
    usersConnected.push({
        user: user,
        socketId: socket.id,
        connected: true,
        balance: 10000,
        ready: false,
        betValue: 0,
        PlayerCards: [],
        PlayerScore: 0,
        PlayerCount: 0,
        buttonsState: {
            hitDisabled: false,
            standDisabled: false,
            doubleDisabled: false,
            surrenderDisabled: false,
            newGameDisabled: true
        },
        finish: false,
        hisTurn: false,
        message: '',
        surrender: false,
        blackjack: false
    });
};

const newGame = () => {
    gameState = GameState.betTime;
    dealer.cards = [];
    dealer.score = 0;
    dealer.count = 0;
    usersConnected.forEach((user) => {
        //user.ready = false;
        user.PlayerCards = [];
        user.PlayerScore = 0;
        user.PlayerCount = 0;
        user.message = '';
    });
    usersConnected[0].hisTurn = true;
    deck = [];
    generateDeck();
};

const generateCard = (deal, user) =>{
    const cardNumber = Math.floor(Math.random() * deck.length);
    const card = deck[cardNumber];
    deck.splice(cardNumber, 1);
    if(card.charAt(1) !== '_'){
        giveCard(deal, card.charAt(0)+card.charAt(1), card.charAt(3), user);
    }else{
        giveCard(deal, card.charAt(0), card.charAt(2), user);
    }
}

const giveCard = (deal, value, suit, user) =>{
    if(deal === Deal.user){
        user.PlayerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
    }else if(deal === Deal.dealer){
        dealer.cards.push({ 'value': value, 'suit': suit, 'hidden': false });
    }else{
        dealer.cards.push({ 'value': value, 'suit': suit, 'hidden': true });
    }
}

const calculateScore = (cards) =>{
    let score = 0;
    cards.forEach(card => {
        if(card.hidden === false && card.value !== 'A'){
            switch(card.value){
                case 'J':
                    score += 10;
                    break;
                case 'Q':
                    score += 10;
                    break;
                case 'K':
                    score += 10;
                    break;
                default:
                    score += parseInt(card.value);
                    break;
            }
        }
    });

    const aces = cards.filter(card => card.value === 'A' && card.hidden === false);
    score += aces.length*11;
    while(score > 21 && aces.length > 0){
        score -= 10;
        aces.pop();
    }
    return score;
}

const busted = (user) => {
    return user.PlayerScore > 21;
};

const nextPlayerTurn = (index) => {
    usersConnected[index].buttonsState = {hitDisabled: true, standDisabled: true, doubleDisabled: true, surrenderDisabled: true, newGameDisabled: true};
    usersConnected[index].hisTurn = false;
    if(index < 2 && index > -1 && usersConnected[index+1] !== undefined){
        usersConnected[index+1].hisTurn = true;
        buttonsForBlackjack(usersConnected[index+1], {hitDisabled: false, standDisabled: false, doubleDisabled: false, surrenderDisabled: false, newGameDisabled: true});
    }else{
        gameState = GameState.dealerTurn;
        //CZĘŚĆ DEALERA
        showDealersHand();
        while(dealer.score < 17){
            generateCard(Deal.dealer);
            dealer.score = calculateScore(dealer.cards);
        }
        calculateWins();
    }
};

const showDealersHand = () => {
    dealer.cards.map(card => card.hidden === true ? card.hidden = false : null);
    dealer.score = calculateScore(dealer.cards);
}

const calculateWins = () => {
    usersConnected.forEach((user) => {
        if(user.surrender){
            user.message = Message.lose + ' Przegrałeś '+user.betValue+'$';
            user.betValue = 0;
        }else{
            if(user.PlayerScore <= 21 && user.PlayerScore > dealer.score){
                user.message = Message.win + ' Wygrywasz '+user.betValue*2+'$';
                user.balance += user.betValue*2;
                user.betValue = 0;
            }else if(user.PlayerScore <= 21 && user.PlayerScore === dealer.score){
                user.message = Message.tie + ' A więc nic nie tracisz';
                user.balance += user.betValue;
                user.betValue = 0;
            }else if(user.PlayerScore <= 21 && user.PlayerScore < dealer.score && dealer.score <= 21){
                user.message = Message.lose + ' Przegrałeś '+user.betValue+'$';
                user.betValue = 0;
            }else if(user.PlayerScore > 21){
                user.message = Message.lose + ' Przegrałeś '+user.betValue+'$';
                user.betValue = 0;
            }
        }
        user.buttonsState = {
            hitDisabled: true,
            standDisabled: true,
            doubleDisabled: true,
            surrenderDisabled: true,
            newGameDisabled: false
        };
    });
}

const hit = (index) => {
    generateCard(Deal.user, usersConnected[index]);
    usersConnected[index].PlayerScore = calculateScore(usersConnected[index].PlayerCards);
    if(usersConnected[index].PlayerCount <= 3){
        usersConnected[index].buttonsState = {
            hitDisabled: false,
            standDisabled: false,
            doubleDisabled: true,
            surrenderDisabled: false,
            newGameDisabled: true
        };
    }
    if(busted(usersConnected[index])){
        usersConnected[index].buttonsState = {
            hitDisabled: true,
            standDisabled: true,
            doubleDisabled: true,
            surrenderDisabled: true,
            newGameDisabled: false
        }
        usersConnected[index].message = Message.bust;
        nextPlayerTurn(index);
    }
}

const buttonsForBlackjack = (user, buttonsProp) => {
    if(user.blackjack){
        user.buttonsState = {
            hitDisabled: true,
            standDisabled: false,
            doubleDisabled: true,
            surrenderDisabled: true,
            newGameDisabled: true
        }
    }else{
        user.buttonsState = buttonsProp;
    }
}

io.on('connection', (socket) => {
  console.log('Nowe połączenie websockets');
  socket.on('login', (data) => {
    console.log('Nowe logowanie');
    const user = users.find((user) => user.email === data.email_login && user.password === data.password);
    if (user) {
        if(usersConnected.some((userConnect) => userConnect.user === user)){
            socket.emit('login_error', {
                message: 'Taki użykownik już jest zalogowany!',
                passwordError: false,
                loginError: false
            });
        }else if(usersConnected.length > 3){
            socket.emit('login_success', {
                message: 'Za dużo użytkowników, proszę spróbować później!',
                password_error: false,
                login_error: false,
            });
        }else{
            addConnectedUser(socket, user);
            socket.emit('login_success', {
                message: 'Logowanie powiodło się pomyślnie',
                password_error: false,
                login_error: false,
                user: user,
                usersActive: usersConnected
            });
        }
    } else if(users.find((user) => user.email === data.email_login)){
        socket.emit('login_error', {
            message: 'Nieprawidłowe hasło!',
             passwordError: true,
              loginError: false
        });
    } else {
        socket.emit('login_error', {
            message: 'Nieprawidłowe dane!', 
            passwordError: true, 
            loginError: true
        });
    }
  });

  socket.on('register', (data) => {
    if (userExists(data.email)) {
        socket.emit('register_error', {
            message: 'Użytkownik już istnieje'
        });
    } else {
        addUser(data.email, 'a', data.imie, data.nazwisko, data.dataUro, data.kraj, data.miasto, data.adres, data.kod_pocztowy, data.waluta, data.nr_tel);
        socket.emit('register_success', {
            message: 'Rejestracja powiodła się pomyślnie', 
            user: data
        });
    }
  });

  socket.on('placeBet', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    usersConnected[index].balance -= data.betValue;
    usersConnected[index].ready = true;
    usersConnected[index].betValue += data.betValue;
    
    socket.emit('placeBet_success', {
        message: 'Stawka postawiona, ale być może trzeba poczekać na wszystkich graczy: ', 
        user: usersConnected[index], 
        usersActive: usersConnected
    });

    if(usersConnected.filter((user) => user.ready === true).length === usersConnected.length){
        //ROZPOCZĘCIE GRY
        newGame();
        gameState = GameState.start;
        usersConnected.forEach((user) => {
            user.ready = false;
            generateCard(Deal.user, user);
            generateCard(Deal.user, user);
            user.PlayerScore = calculateScore(user.PlayerCards);
            if(user.PlayerScore === 21){
                user.message = Message.blackjack + ' Wygrałeś '+user.betValue*2.5+'$';
                user.blackjack = true;
                user.balance += (user.betValue * 2.5);
                user.betValue = 0;
            }
            if(user.hisTurn){
                buttonsForBlackjack(user, {hitDisabled: false, standDisabled: false, doubleDisabled: false, surrenderDisabled: false, newGameDisabled: true});
                user.message = Message.hitStand;
            }else{
                user.buttonsState = {hitDisabled: true, standDisabled: true, doubleDisabled: true, surrenderDisabled: true, newGameDisabled: true};
                user.message = Message.wait;
            }
        });
        generateCard(Deal.dealer);
        generateCard(Deal.hidden);
        dealer.score = calculateScore(dealer.cards);
        io.emit('playGame_success', {
            message: 'Gra rozpoczęta: ',
            usersActive: usersConnected,
            dealer: dealer,
            gameState: gameState
        });
    }
  });

  socket.on('giveButtonState', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    socket.emit('giveButtonState_success', {
        message: 'Pobrano stan przycisków: ',
        buttons: usersConnected[index].buttonsState,
        mess: usersConnected[index].message,
        userTurn: usersConnected[index].hisTurn
    })
  });

  socket.on('calculateScore', () => {
    usersConnected.forEach((user) => {
        user.PlayerScore = calculateScore(user.PlayerCards);
    });
    dealer.score = calculateScore(dealer.cards);
    io.emit('calculateScore_success', {
        usersActive: usersConnected,
        dealer: dealer,
        gameState: gameState
    });
  });

  socket.on('hit', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    hit(index);
    io.emit('hit_success', {
        message: usersConnected[index].user.imie + ' dobrał 1 kartę',
        usersActive: usersConnected,
        dealer: dealer,
        gameState: gameState
    })
  });

  socket.on('stand', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    nextPlayerTurn(index);
    io.emit('stand_success', {
        message: usersConnected[index].user.imie + ' czeka',
        usersActive: usersConnected,
        dealer: dealer,
        gameState: gameState
    })
  });

  socket.on('surrender', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    usersConnected[index].surrender = true;
    nextPlayerTurn(index);
    io.emit('surrender_success', {
        message: usersConnected[index].user.imie + ' poddał się ;c',
        usersActive: usersConnected,
        dealer: dealer,
        gameState: gameState
    })
  });

  socket.on('double', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    hit(index);
    usersConnected[index].balance -= data.betValue;
    usersConnected[index].betValue += data.betValue;
    nextPlayerTurn(index);
    io.emit('double_success', {
        message: usersConnected[index].user.imie + ' podwoił stawkę ;0',
        usersActive: usersConnected,
        dealer: dealer,
        gameState: gameState
    })
  });

  socket.on('restartGame', (data) => {
    console.log(data);
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    usersConnected[index].buttonsState = {hitDisabled: true, standDisabled: true, doubleDisabled: true, surrenderDisabled: true, newGameDisabled: true};
    usersConnected[index].finish = true;
    usersConnected[index].message = Message.wait;
    if(usersConnected.filter((user) => user.finish === true).length === usersConnected.length && usersConnected.length > 1){
        newGame();
        io.emit('restartGame_success', {
            message: 'RESTART!',
            usersActive: usersConnected,
            dealer: dealer,
            gameState: gameState
        })
        //PRZEKAZANIE DANYCH DO GRACZY
    }else if(usersConnected.length === 1){
        newGame();
        socket.emit('restartGame_50_success', {
            message: 'RESTART!',
            usersActive: usersConnected,
            dealer: dealer,
            user: usersConnected[index],
            gameState: gameState
        })
    }else{
        socket.emit('restartGame_50_success', {
            message: 'RESTART VOTE!',
            usersActive: usersConnected,
            dealer: dealer,
            user: usersConnected[index],
            gameState: gameState
        })
    }
    
  });

  socket.on('loan', (data) => {
    const index = usersConnected.findIndex((user) => user.user.email === data.user.email);
    usersConnected[index].balance = data.newBalance;

    socket.emit('loan_success', {
        message: 'Kredyt wzięty: ', 
        user: usersConnected[index], 
        usersActive: usersConnected,
        dealer: dealer
    });
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

const port = 5000;
server.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});