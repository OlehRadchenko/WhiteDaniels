import { useState } from "react";
import { Button, Input } from "@mui/material";

const Blackjack = () =>{
    const [money, setMoney] = useState(1000);
    const [obstawione, setObstawione] = useState(0);
    const [obstawione2, setObstawione2] = useState(0);
    const [czyli, setCzyli] = useState('');

    const [startGame, setStartGame] = useState(false);
    const [dealerCards, setDealerCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);
    
    const nominaly = [
        { wartosc: 5000, ilosc: 0, color: 'Brązowy' },
        { wartosc: 2000, ilosc: 0, color: 'Jasno niebieski' },
        { wartosc: 1000, ilosc: 0, color: 'Żółty' },
        { wartosc: 500, ilosc: 0, color: 'Fioletowy' },
        { wartosc: 250, ilosc: 0, color: 'Różowy' },
        { wartosc: 100, ilosc: 0, color: 'Czarny' },
        { wartosc: 50, ilosc: 0, color: 'Pomarańczowy' },
        { wartosc: 25, ilosc: 0, color: 'Zielony' },
        { wartosc: 20, ilosc: 0, color: 'Szary' },
        { wartosc: 10, ilosc: 0, color: 'Niebieski' },
        { wartosc: 5, ilosc: 0, color: 'Czerwony' },
        { wartosc: 1, ilosc: 0, color: 'Biały' }
    ];
    const karty = [
        {wartosc: 11, karta: 'As', color: 'Pika', show: false},
        {wartosc: 10, karta: 'Król', color: 'Pika', show: false},
        {wartosc: 10, karta: 'Dama', color: 'Pika', show: false},
        {wartosc: 10, karta: 'Walet', color: 'Pika', show: false},
        {wartosc: 10, karta: '10', color: 'Pika', show: false},
        {wartosc: 9, karta: '9', color: 'Pika', show: false},
        {wartosc: 8, karta: '8', color: 'Pika', show: false},
        {wartosc: 7, karta: '7', color: 'Pika', show: false},
        {wartosc: 6, karta: '6', color: 'Pika', show: false},
        {wartosc: 5, karta: '5', color: 'Pika', show: false},
        {wartosc: 4, karta: '4', color: 'Pika', show: false},
        {wartosc: 3, karta: '3', color: 'Pika', show: false},
        {wartosc: 2, karta: '2', color: 'Pika', show: false},
        {wartosc: 11, karta: 'As', color: 'Karo', show: false},
        {wartosc: 10, karta: 'Król', color: 'Karo', show: false},
        {wartosc: 10, karta: 'Dama', color: 'Karo', show: false},
        {wartosc: 10, karta: 'Walet', color: 'Karo', show: false},
        {wartosc: 10, karta: '10', color: 'Karo', show: false},
        {wartosc: 9, karta: '9', color: 'Karo', show: false},
        {wartosc: 8, karta: '8', color: 'Karo', show: false},
        {wartosc: 7, karta: '7', color: 'Karo', show: false},
        {wartosc: 6, karta: '6', color: 'Karo', show: false},
        {wartosc: 5, karta: '5', color: 'Karo', show: false},
        {wartosc: 4, karta: '4', color: 'Karo', show: false},
        {wartosc: 3, karta: '3', color: 'Karo', show: false},
        {wartosc: 2, karta: '2', color: 'Karo', show: false},
        {wartosc: 11, karta: 'As', color: 'Trefl', show: false},
        {wartosc: 10, karta: 'Król', color: 'Trefl', show: false},
        {wartosc: 10, karta: 'Dama', color: 'Trefl', show: false},
        {wartosc: 10, karta: 'Walet', color: 'Trefl', show: false},
        {wartosc: 10, karta: '10', color: 'Trefl', show: false},
        {wartosc: 9, karta: '9', color: 'Trefl', show: false},
        {wartosc: 8, karta: '8', color: 'Trefl', show: false},
        {wartosc: 7, karta: '7', color: 'Trefl', show: false},
        {wartosc: 6, karta: '6', color: 'Trefl', show: false},
        {wartosc: 5, karta: '5', color: 'Trefl', show: false},
        {wartosc: 4, karta: '4', color: 'Trefl', show: false},
        {wartosc: 3, karta: '3', color: 'Trefl', show: false},
        {wartosc: 2, karta: '2', color: 'Trefl', show: false},
        {wartosc: 11, karta: 'As', color: 'Serce', show: false},
        {wartosc: 10, karta: 'Król', color: 'Serce', show: false},
        {wartosc: 10, karta: 'Dama', color: 'Serce', show: false},
        {wartosc: 10, karta: 'Walet', color: 'Serce', show: false},
        {wartosc: 10, karta: '10', color: 'Serce', show: false},
        {wartosc: 9, karta: '9', color: 'Serce', show: false},
        {wartosc: 8, karta: '8', color: 'Serce', show: false},
        {wartosc: 7, karta: '7', color: 'Serce', show: false},
        {wartosc: 6, karta: '6', color: 'Serce', show: false},
        {wartosc: 5, karta: '5', color: 'Serce', show: false},
        {wartosc: 4, karta: '4', color: 'Serce', show: false},
        {wartosc: 3, karta: '3', color: 'Serce', show: false},
        {wartosc: 2, karta: '2', color: 'Serce', show: false}
    ];
    const input_obstawianie = (event) =>{
        setObstawione(event.target.value);
    }
    const podziel_pieniadze = () =>{
        setCzyli('');
        let reszta = obstawione;
        nominaly.forEach(nominal => {
            let ileRazy = Math.floor(reszta / nominal.wartosc);
            reszta -= ileRazy * nominal.wartosc;
            nominal.ilosc += ileRazy;
            if(nominal.ilosc>0){
                setCzyli(perv => perv + nominal.ilosc + ' x ' + nominal.color + '(' + nominal.wartosc + '$) ');
            }
        })
        setMoney(money - obstawione);
    }

    const dodajObstawione = (wartosc) =>{
        setObstawione2(obstawione2 + wartosc);
        setMoney(money - wartosc);
    }

    const wylosujKarte = (shows) =>{
        let karta = Math.floor(Math.random() * karty.length);
        let los = karty[karta];
        los.show = shows;
        return los;
    }
    const newGame = () =>{
        setMoney(1000);
        setObstawione(0);
        setObstawione2(0);
        setCzyli('');
        setDealerCards([wylosujKarte(true), wylosujKarte(false)]);
        setPlayerCards([wylosujKarte(true), wylosujKarte(true)]);
        setStartGame(true);
    }
    const hit = () =>{
        let nowa_karta = wylosujKarte(true);
        setPlayerCards([...playerCards, nowa_karta]); //raz na jakiś czas, karta nie zostaje dodana dlatego pojawia się bug
        if(playerCards.reduce((suma, karta) => suma + karta.wartosc, 0)+nowa_karta.wartosc>21){
            endGame();
        }
    }
    const stand = () =>{
        setDealerCards([...dealerCards, wylosujKarte()]);
        endGame();
    }
    const double = () =>{
        setPlayerCards([...playerCards, wylosujKarte()]);
        endGame();
    }
    const endGame = () =>{
        setStartGame(false);
        showDealerCards();
        let dealerSum = dealerCards.reduce((suma, karta) => suma + karta.wartosc, 0);
        if (dealerSum < 17) {
            const newDealerCards = [...dealerCards];
            while (dealerSum < 17) {
                const newCard = wylosujKarte(true);
                newDealerCards.push(newCard);
                dealerSum += newCard.wartosc;
            }
            setDealerCards(newDealerCards);
        }
        let playerSum = playerCards.reduce((suma, karta) => suma + karta.wartosc, 0);
        if((playerSum > dealerSum && playerSum <= 21) || (dealerSum > 21 && playerSum <= 21)){
            console.log("WYGRAŁEŚ BOTA, DOSTAJESZ X2 $      DEALER: "+dealerSum+"   PLAYER: "+playerSum);
        }else if((playerSum > 21 && dealerSum > 21) || (playerSum === dealerSum)){
            console.log("REMIS!! NIC NIE ZARABIASZ      DEALER: "+dealerSum+"   PLAYER: "+playerSum);
        }else{
            console.log("PRZEGRAŁEŚ!! STRACIŁEŚ CAŁOŚĆ      DEALER: "+dealerSum+"   PLAYER: "+playerSum);
        }
    }
    const showDealerCards = () =>{
        let karty = [...dealerCards];
        karty[0].show = true;
        karty[1].show = true;
        setDealerCards(karty);
    }
    return(
        <div id="Blackjack">
            <p>Twoje pieniadze: {money} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CHEAT BUTTON = <Button onClick={() => setMoney(money + 1000)}>.</Button></p>
            <div id = "pierwszy_tryb">
                <p>I tryb ostawaniania, osoba obstawia ile chce, skrypt wystawia chipsy</p>
                Obstawiasz: <Input type="number" error={obstawione > money} value={obstawione} onChange={input_obstawianie}/><Button onClick={podziel_pieniadze} disabled={obstawione > money}>Obstaw</Button><br/>
                Czyli: {czyli}
            </div>
            <div id = "drugi_tryb">
                <p>II tryb ostawaniania, osoba obstawia ile chce, sama wystawia chipsy</p>
                <p>
                    {nominaly.map((nominal, index) => <Button key={index} color="error" disabled={money < nominal.wartosc} onClick={() => dodajObstawione(nominal.wartosc)}>{nominal.wartosc}$</Button>)}

                </p>
                Czyli obstawiłeś: {obstawione2}
            </div>
            <div id = "losowania">
                <Button onClick={newGame}>New Game</Button>
                <p>Dealer: {dealerCards.map((karta, index) => <span style={karta.show ? {} : {display: 'none'}} key={index}>{karta.karta} {karta.color} </span>)}</p><p style={!startGame ? {} : {display: 'none'}}>punkty dealera: {dealerCards.reduce((suma, karta) => suma + karta.wartosc, 0)}</p>
                <p>Player: {playerCards.map((karta, index) => <span style={karta.show ? {} : {display: 'none'}} key={index}>{karta.karta} {karta.color} </span>)}</p><p>twoje punkty: {playerCards.reduce((suma, karta) => suma + karta.wartosc, 0)}</p>
                <Button onClick={hit} color="success" disabled={playerCards.length === 5 || !startGame}>Hit</Button>
                <Button onClick={stand} color="error" disabled={!startGame}>Stand</Button>
                <Button onClick={double} color="success" disabled={playerCards.length === 5 || !startGame}>Double</Button>
            </div>
        </div>
    )
}

export default Blackjack;