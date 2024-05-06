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
        {wartosc: 11, karta: 'As', color: 'Pika'},
        {wartosc: 10, karta: 'Król', color: 'Pika'},
        {wartosc: 10, karta: 'Dama', color: 'Pika'},
        {wartosc: 10, karta: 'Walet', color: 'Pika'},
        {wartosc: 10, karta: '10', color: 'Pika'},
        {wartosc: 9, karta: '9', color: 'Pika'},
        {wartosc: 8, karta: '8', color: 'Pika'},
        {wartosc: 7, karta: '7', color: 'Pika'},
        {wartosc: 6, karta: '6', color: 'Pika'},
        {wartosc: 5, karta: '5', color: 'Pika'},
        {wartosc: 4, karta: '4', color: 'Pika'},
        {wartosc: 3, karta: '3', color: 'Pika'},
        {wartosc: 2, karta: '2', color: 'Pika'},
        {wartosc: 11, karta: 'As', color: 'Karo'},
        {wartosc: 10, karta: 'Król', color: 'Karo'},
        {wartosc: 10, karta: 'Dama', color: 'Karo'},
        {wartosc: 10, karta: 'Walet', color: 'Karo'},
        {wartosc: 10, karta: '10', color: 'Karo'},
        {wartosc: 9, karta: '9', color: 'Karo'},
        {wartosc: 8, karta: '8', color: 'Karo'},
        {wartosc: 7, karta: '7', color: 'Karo'},
        {wartosc: 6, karta: '6', color: 'Karo'},
        {wartosc: 5, karta: '5', color: 'Karo'},
        {wartosc: 4, karta: '4', color: 'Karo'},
        {wartosc: 3, karta: '3', color: 'Karo'},
        {wartosc: 2, karta: '2', color: 'Karo'},
        {wartosc: 11, karta: 'As', color: 'Trefl'},
        {wartosc: 10, karta: 'Król', color: 'Trefl'},
        {wartosc: 10, karta: 'Dama', color: 'Trefl'},
        {wartosc: 10, karta: 'Walet', color: 'Trefl'},
        {wartosc: 10, karta: '10', color: 'Trefl'},
        {wartosc: 9, karta: '9', color: 'Trefl'},
        {wartosc: 8, karta: '8', color: 'Trefl'},
        {wartosc: 7, karta: '7', color: 'Trefl'},
        {wartosc: 6, karta: '6', color: 'Trefl'},
        {wartosc: 5, karta: '5', color: 'Trefl'},
        {wartosc: 4, karta: '4', color: 'Trefl'},
        {wartosc: 3, karta: '3', color: 'Trefl'},
        {wartosc: 2, karta: '2', color: 'Trefl'},
        {wartosc: 11, karta: 'As', color: 'Serce'},
        {wartosc: 10, karta: 'Król', color: 'Serce'},
        {wartosc: 10, karta: 'Dama', color: 'Serce'},
        {wartosc: 10, karta: 'Walet', color: 'Serce'},
        {wartosc: 10, karta: '10', color: 'Serce'},
        {wartosc: 9, karta: '9', color: 'Serce'},
        {wartosc: 8, karta: '8', color: 'Serce'},
        {wartosc: 7, karta: '7', color: 'Serce'},
        {wartosc: 6, karta: '6', color: 'Serce'},
        {wartosc: 5, karta: '5', color: 'Serce'},
        {wartosc: 4, karta: '4', color: 'Serce'},
        {wartosc: 3, karta: '3', color: 'Serce'},
        {wartosc: 2, karta: '2', color: 'Serce'}
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

    const wylosujKarte = () =>{
        let karta = Math.floor(Math.random() * karty.length);
        return karty[karta];
    }
    const newGame = () =>{
        setMoney(1000);
        setObstawione(0);
        setObstawione2(0);
        setCzyli('');
        setDealerCards([wylosujKarte(), wylosujKarte()]);
        setPlayerCards([wylosujKarte(), wylosujKarte()]);
        setStartGame(true);
    }
    const hit = () =>{
        setPlayerCards([...playerCards, wylosujKarte()]);
    }
    const stand = () =>{
        setDealerCards([...dealerCards, wylosujKarte()]);
    }
    const double = () =>{
        setPlayerCards([...playerCards, wylosujKarte()]);
        setStartGame(false);
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
                <p>Dealer: {dealerCards.map((karta, index) => <span key={index}>{karta.karta} {karta.color} </span>)}</p>
                <p>Player: {playerCards.map((karta, index) => <span key={index}>{karta.karta} {karta.color} </span>)}</p>
                <Button onClick={hit} color="success" disabled={playerCards.length === 5 || !startGame}>Hit</Button>
                <Button onClick={stand} color="error" disabled={!startGame}>Stand</Button>
                <Button onClick={double} color="success" disabled={playerCards.length === 5 || !startGame}>Double</Button>
            </div>
        </div>
    )
}

export default Blackjack;