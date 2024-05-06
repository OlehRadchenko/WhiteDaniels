import { useState } from "react";
import { Button, Input } from "@mui/material";

const Blackjack = () =>{
    const [money, setMoney] = useState(1000);
    const [obstawione, setObstawione] = useState(0);
    const [obstawione2, setObstawione2] = useState(0);
    const [czyli, setCzyli] = useState('');
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
        </div>
    )
}

export default Blackjack;