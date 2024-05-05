import './forms_style.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useState } from 'react';

const LoginAndRegisterForm = () =>{
    const [mode, setMode] = useState('Login');
    const [email_login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [dataUro, setDataUro] = useState('');
    const [email, setEmail] = useState('');
    const [kraj, setKraj] = useState('');
    const [miasto, setMiasto] = useState('');
    const [adres, setAdres] = useState('');
    const [kod_pocztowy, setKodPocztowy] = useState('');
    const [waluta, setWaluta] = useState('');
    const [nr_tel, setNrTel] = useState('');
    const waluty = ['PLN', 'EUR', 'USD', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF'];
    const kraje = [
        "Argentyna", "Australia", "Belgia", "Brazylia", "Brazylia", "Boliwia", "Kanada",
        "Chile", "Chiny", "Kongo", "Czechy", "Etiopia", "Filipiny", "Finlandia", "Grecja",
        "Haiti", "Honduras", "Irak", "Irlandia", "Jamajka", "Japonia", "Jordania", "Kazachstan",
        "Korea", "Niemcy", "Peru", "Polska", "Portugalia", "Paragwaj", "Słowacja", "Słowenia",
        "Sudan", "Szwajcaria", "Szwecja", "Turcja", "Ukraina", "USA", "Wenezuela", "Walia",
        "Wielka Brytania", "Włochy"];
    let email_login_error, password_error, imie_error, nazwisko_error, dataUro_error, email_error, miasto_error, adres_error, kod_pocztowy_error, nr_tel_error;
    const changeMode = () =>{
        setMode(mode === 'Login' ? 'Register' : 'Login');
    }

    const EmailLoginInput = (event) =>{
        setLogin(event.target.value);
    }
    const PasswordInput = (event) =>{
        setPassword(event.target.value);
    }
    const LoginButton = () =>{
        if(email_login !== '' && password !== ''){
            console.log('Login: ' + email_login + ' \nPassword: ' + password); //Sprawdzenie czy w bazie danych istnieje taki login i zweryfikowanie poprawności hasła
        }else if(email_login === '' && password === ''){
            console.log('Wszystkie dane wprowadzone są puste');
        }else if(email_login === ''){
            console.log("Wpisany login jest pusty");
        }else{
            console.log("Wpisane hasło jest puste");
        }
    }

    const ImieInput = (event) =>{
        setImie(event.target.value);
    }
    const NazwiskoInput = (event) =>{
        setNazwisko(event.target.value);
    }
    const DataUroInput = (event) =>{
        setDataUro(event.target.value);
    }
    const EmailInput = (event) =>{
        setEmail(event.target.value);
    }
    const KrajInput = (event) =>{
        setKraj(event.target.value);
    }
    const MiastoInput = (event) =>{
        setMiasto(event.target.value);
    }
    const AdresInput = (event) =>{
        setAdres(event.target.value);
    }
    const KodPocztowyInput = (event) =>{
        setKodPocztowy(event.target.value);
    }
    const WalutaInput = (event) =>{
        setWaluta(event.target.value);
    }
    const NrTelInput = (event) =>{
        setNrTel(event.target.value);
    }
    const RegisterButton = () =>{
        //Walidacja danych oraz zapis do bazy danych
        console.log(imie + '\n' + nazwisko + '\n' + dataUro + '\n' + email + '\n' + kraj + '\n' + miasto + '\n' + adres + '\n' + kod_pocztowy + '\n' + waluta + '\n' + nr_tel);
    }
    return(
        <div id={mode === 'Login' ? 'Login' : 'Register'}>
            <div id="titleDiv">
                <p id="title">WHITEDANIELS BLACKJACK</p>
            </div>
            <form>
                {mode === 'Login' ? (
                    <>
                        <Input placeholder="Email" onChange={EmailLoginInput} />
                        <Input placeholder="Hasło" type="password" onChange={PasswordInput} />
                    </>
                ) : (
                    <>
                        <div id="forms">
                            <div id="form1">
                                <Input placeholder="Imie" onChange={ImieInput}/>
                                <Input placeholder="Nazwisko" onChange={NazwiskoInput}/>
                                <FormControl fullWidth>
                                    <Input type="date" placeholder="Data urodzenia" onChange={DataUroInput}/>
                                </FormControl>
                                <Input placeholder="Email" onChange={EmailInput}/>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kraj</InputLabel>
                                    <Select value={kraj} label="Kraj" labelId="demo-simple-select-label" id="demo-simple-select" onChange={KrajInput}>
                                        {kraje.map((kraj, index) => <MenuItem key={index} value={kraj}>{kraj}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div id="form2">
                                <Input placeholder="Miasto" onChange={MiastoInput}/>
                                <Input placeholder="Adres" onChange={AdresInput}/>
                                <Input placeholder="Kod pocztowy" onChange={KodPocztowyInput}/>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Waluta</InputLabel>
                                    <Select value={waluta} label="Waluta" labelId="demo-simple-select-label" id="demo-simple-select" onChange={WalutaInput}>
                                        {waluty.map((waluta, index) => <MenuItem key={index} value={waluta}>{waluta}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Input placeholder="Numer telefonu" onChange={NrTelInput}/>
                            </div>
                        </div>
                    </>
                )}
                <Button variant="contained" color="success" onClick={mode === 'Login' ? RegisterButton : RegisterButton}>
                    {mode === 'Login' ? 'Zaloguj' : 'Zarejestruj się'}
                    {mode === 'Login' ? <SendIcon /> : null}
                </Button>
                <Button variant="outlined" onClick={changeMode}>
                    {mode === 'Login' ? 'Nie masz konta? Zarejestruj się poprzez naciśnięcie tego przycisku' : 'Masz już konto? Zaloguj się poprzez naciśnięcie tego przycisku'}
                </Button>
            </form>
        </div>
    );
}

export default LoginAndRegisterForm;