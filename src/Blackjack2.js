import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Info from './Info';
import Hand from './Hand';
import Buttons from './Buttons';

const Blackjack = () =>{
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
        tie: 'TIE GAME!',
        blackjack: 'BLACKJACK!',
        bust: 'BUST!',
        surrender: 'SURRENDER!',
        error: 'Przepraszamy, wystąpił problem, środki zostaną zwrócone na konto, prosimy o kliknięcie przycisku restartu gry'
    };
    const GameState = {
        betTime : 'betTime',
        userTurn: 'userTurn',
        dealerTurn: 'dealerTurn',
        start: 'start'
    };

    const [gameState, setGameState] = useState(GameState.betTime);

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerCount, setDealerCount] = useState(0);

    const [playerCards, setPlayerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);

    const [bet, setBet] = useState(0);
    const [balance, setBalance] = useState(10000);

    const [message, setMessage] = useState(Message.bet);
    const [buttonsState, setButtonsState] = useState({
        hitDisabled: false,
        standDisabled: false,
        doubleDisabled: false,
        surrenderDisabled: false,
        newGameDisabled: true
    });

    const [deck, setDeck] = useState([]);

    useEffect(() => {
        if (gameState === 'start') {
            generateCard(Deal.user);
            generateCard(Deal.user);
            generateCard(Deal.dealer);
            generateCard(Deal.hidden);
            setGameState(GameState.userTurn);
            setMessage(Message.hitStand);
        }
        // eslint-disable-next-line
    }, [gameState]);

    useEffect(() => {
        calculateScore(playerCards, setPlayerScore);
        setPlayerCount(playerCount + 1);
        // eslint-disable-next-line
    }, [playerCards]);
    
    useEffect(() => {
        calculateScore(dealerCards, setDealerScore);
        setDealerCount(dealerCount + 1);
        // eslint-disable-next-line
    }, [dealerCards]);

    useEffect(() => {
        if(gameState === GameState.userTurn){
            if(playerScore === 21){
                buttonsState.doubleDisabled = true;
                buttonsState.surrenderDisabled = true;
                buttonsState.hitDisabled = true;
                setButtonsState({...buttonsState});
            }else if(playerScore > 21){
                bust();
            }
        }
        // eslint-disable-next-line
    }, [playerCount]);

    useEffect(() => {
        if(gameState === GameState.dealerTurn){
            if(dealerScore >= 17){
                checkWin();
            }else{
                generateCard(Deal.dealer);
            }
        }
        // eslint-disable-next-line
    }, [dealerCount]);

    const newGame = () =>{
        setGameState(GameState.betTime);
        setDealerCards([]);
        setDealerScore(0);
        setDealerCount(0);

        setPlayerCards([]);
        setPlayerScore(0);
        setPlayerCount(0);

        setMessage(Message.bet);
        setButtonsState({
            hitDisabled: false,
            standDisabled: false,
            doubleDisabled: false,
            surrenderDisabled: false,
            newGameDisabled: true
        });

        setDeck([]);
        generateDeck();
        //setBalance(1000);
    }

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
        setDeck([...deckOnTable]);
    }

    const generateCard = (deal) =>{
        if(deck.length === 0){
            setBalance(balance + bet);
            setMessage(Message.error); //IDK CZEMU NIE DZIAŁA
            buttonsState.doubleDisabled = true;
            buttonsState.surrenderDisabled = true;
            buttonsState.hitDisabled = true;
            buttonsState.standDisabled = true;
            buttonsState.newGameDisabled = false;
            setButtonsState({...buttonsState});
        }else{
            const cardNumber = Math.floor(Math.random() * deck.length);
            const card = deck[cardNumber];
            deck.splice(cardNumber, 1);
            setDeck([...deck]);
            if(card.charAt(1) !== '_'){
                giveCard(deal, card.charAt(0)+card.charAt(1), card.charAt(3));
            }else{
                giveCard(deal, card.charAt(0), card.charAt(2));
            }
        }
    }
    const giveCard = (deal, value, suit) =>{
        if(deal === Deal.user){
            playerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
            setPlayerCards([...playerCards]);
        }else if(deal === Deal.dealer){
            dealerCards.push({ 'value': value, 'suit': suit, 'hidden': false });
            setDealerCards([...dealerCards]);
        }else{
            dealerCards.push({ 'value': value, 'suit': suit, 'hidden': true });
            setDealerCards([...dealerCards]);
        }
    }
    const showDealerCards = () =>{
        dealerCards.map(card => card.hidden === true ? card.hidden = false : null);
        setDealerCards([...dealerCards]);
    }

    const calculateScore = (cards, setter) =>{
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
        setter(score);
    }

    const hit = () =>{
        generateCard(Deal.user);
    }
    const stand = () =>{
        buttonsState.hitDisabled = true;
        buttonsState.standDisabled = true;
        buttonsState.doubleDisabled = true;
        buttonsState.surrenderDisabled = true;
        buttonsState.newGameDisabled = false;
        setButtonsState({ ...buttonsState });
        setGameState(GameState.dealerTurn);
        showDealerCards();
    }
    const double = () =>{
        hit();
        /*TUTAJ DODAĆ 2X BET ORAZ SPRAWDZIĆ CZY WGL SIĘ DA OBSTAWIĆ 2X*/
        stand();
    }
    const bust = () =>{
        buttonsState.hitDisabled = true;
        buttonsState.standDisabled = true;
        buttonsState.doubleDisabled = true;
        buttonsState.surrenderDisabled = true;
        buttonsState.newGameDisabled = false;
        setButtonsState({ ...buttonsState });
        setMessage(Message.bust);
    }
    const surrender = () =>{
        buttonsState.hitDisabled = true;
        buttonsState.standDisabled = true;
        buttonsState.doubleDisabled = true;
        buttonsState.surrenderDisabled = true;
        buttonsState.newGameDisabled = false;
        setButtonsState({ ...buttonsState });
        setMessage(Message.surrender);
    }

    const checkWin = () =>{
        if(message !== Message.surrender){
            if((playerScore > dealerScore && playerScore < 21) || dealerScore > 21){
                setMessage(Message.win + ' Wygrywasz: ' + bet);
                setBalance(balance + (bet*2));
            }else if(playerScore === dealerScore){
                setMessage(Message.tie + ' Więc nic nie tracisz');
                setBalance(balance + bet);
            }else if(dealerScore > playerScore && dealerScore < 21){
                setMessage(Message.lose + ' Straciłeś: ' + bet);
            }else if(playerScore === 21){
                setMessage(Message.blackjack + ' Wygrywasz: ' + bet*1.5);
                setBalance(balance + (bet*2.5));
            }
        }else{
            setMessage(Message.surrender + ' Straciłeś: ' + bet/2);
            setBalance(balance + (bet/2));
        }
    }
    const placeBet = (bet) =>{
        if(bet <= balance && bet !== 0){
            setBet(bet);
            setBalance(balance - bet);
            setGameState(GameState.start);
        }
    }
    
    return(
        <div id="Blackjack">
            <Link to="/blackjack">WRÓĆ</Link>
            <div id = "losowania">
                <Buttons balance={balance} gameState={gameState} betEvent={placeBet} hitEvent={hit} hitState={buttonsState.hitDisabled} standEvent={stand} standState={buttonsState.standDisabled} doubleEvent={double} doubleState={buttonsState.doubleDisabled} surrenderEvent={surrender} surrenderState={buttonsState.surrenderDisabled} newGameEvent={newGame} newGameState={buttonsState.newGameDisabled}/>
                <Hand title="Dealer's Hand" cards={dealerCards} actualScore={dealerScore}/>
                <Hand title="Player's Hand" cards={playerCards} actualScore={playerScore}/>
                <Info message={message} balance={balance}/>
            </div>
        </div>
    )
}

export default Blackjack;