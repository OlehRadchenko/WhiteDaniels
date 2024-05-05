import './forms_style.css';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

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
    const [email_login_error, setEmailLoginError] = useState(false);
    const [password_error, setPasswordError] = useState(false);
    const [imie_error, setImieError] = useState(false);
    const [nazwisko_error, setNazwiskoError] = useState(false);
    const [dataUro_error, setDataUroError] = useState(false);
    const [email_error, setEmailError] = useState(false);
    const [kraj_error, setKrajError] = useState(false);
    const [miasto_error, setMiastoError] = useState(false);
    const [adres_error, setAdresError] = useState(false);
    const [kod_pocztowy_error, setKodPocztowyError] = useState(false);
    const [waluta_error, setWalutaError] = useState(false);
    const [nr_tel_error, setNrTelError] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const waluty = ['PLN', 'EUR', 'USD', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF'];
    const kraje = [
        "Argentyna", "Australia", "Belgia", "Brazylia", "Brazylia", "Boliwia", "Kanada",
        "Chile", "Chiny", "Kongo", "Czechy", "Etiopia", "Filipiny", "Finlandia", "Grecja",
        "Haiti", "Honduras", "Irak", "Irlandia", "Jamajka", "Japonia", "Jordania", "Kazachstan",
        "Korea", "Niemcy", "Peru", "Polska", "Portugalia", "Paragwaj", "Słowacja", "Słowenia",
        "Sudan", "Szwajcaria", "Szwecja", "Turcja", "Ukraina", "USA", "Wenezuela", "Walia",
        "Wielka Brytania", "Włochy"];
    let isValid = true;
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
            setEmailLoginError(false);
            setPasswordError(false);
            if(email_login === 'admin' && password === 'admin'){
                console.log('redirect to /blackjack');
                //Tu trzeba zrobić przejście do innego pliku
                setRedirect(<Navigate to="/blackjack" />);
            }
        }else if(email_login === '' && password === ''){
            setEmailLoginError(true);
            setPasswordError(true);
        }else if(email_login === ''){
            setEmailLoginError(true);
            setPasswordError(false);
        }else{
            setPasswordError(true);
            setEmailLoginError(false);
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
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }
    const validatePostalCode = (postalCode) => {
        return /^\d{2}-\d{3}$/.test(postalCode);
    }
    const otherValidate = (value, funct) => {
        if (value === '') {
            funct(true);
            isValid = false;
        } else {
            funct(false);
        }
    }
    const RegisterButton = () =>{
        isValid = true;
        otherValidate(imie, setImieError);
        otherValidate(nazwisko, setNazwiskoError);
        otherValidate(dataUro, setDataUroError);

        if (email === '' || !validateEmail(email)) {
            isValid = false;
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        otherValidate(kraj, setKrajError);
        otherValidate(miasto, setMiastoError);
        otherValidate(adres, setAdresError);
        if (kod_pocztowy === '' || !validatePostalCode(kod_pocztowy)) {
            isValid = false;
            setKodPocztowyError(true);
        } else {
            setKodPocztowyError(false);
        }
        otherValidate(waluta, setWalutaError);
        otherValidate(nr_tel, setNrTelError);

        if(isValid){
            console.log(imie + '\n' + nazwisko + '\n' + dataUro + '\n' + email + '\n' + kraj + '\n' + miasto + '\n' + adres + '\n' + kod_pocztowy + '\n' + waluta + '\n' + nr_tel);
        }
    }

    return(
        <div id={mode === 'Login' ? 'Login' : 'Register'}>
            {redirect}
            <div id="titleDiv">
                <p id="title">WHITEDANIELS BLACKJACK</p>
            </div>
            <form>
                {mode === 'Login' ? (
                    <>
                        <Input placeholder="Email" onChange={EmailLoginInput} error={email_login_error}/>
                        <Input placeholder="Hasło" type="password" onChange={PasswordInput} error={password_error}/>
                    </>
                ) : (
                    <>
                        <div id="forms">
                            <div id="form1">
                                <Input placeholder="Imie" onChange={ImieInput} error={imie_error}/>
                                <Input placeholder="Nazwisko" onChange={NazwiskoInput} error={nazwisko_error}/>
                                <FormControl fullWidth>
                                    <Input type="date" placeholder="Data urodzenia" onChange={DataUroInput} error={dataUro_error}/>
                                </FormControl>
                                <Input placeholder="Email" onChange={EmailInput} error={email_error}/>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Kraj</InputLabel>
                                    <Select value={kraj} label="Kraj" labelId="demo-simple-select-label" id="demo-simple-select" onChange={KrajInput} error={kraj_error}>
                                        {kraje.map((kraj, index) => <MenuItem key={index} value={kraj}>{kraj}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>
                            <div id="form2">
                                <Input placeholder="Miasto" onChange={MiastoInput} error={miasto_error}/>
                                <Input placeholder="Adres" onChange={AdresInput} error={adres_error}/>
                                <Input placeholder="Kod pocztowy" onChange={KodPocztowyInput} error={kod_pocztowy_error}/>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Waluta</InputLabel>
                                    <Select value={waluta} label="Waluta" labelId="demo-simple-select-label" id="demo-simple-select" onChange={WalutaInput} error={waluta_error}>
                                        {waluty.map((waluta, index) => <MenuItem key={index} value={waluta}>{waluta}</MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Input placeholder="Numer telefonu" onChange={NrTelInput} error={nr_tel_error}/>
                            </div>
                        </div>
                    </>
                )}
                <Button variant="contained" color="success" endIcon={mode==='Login' ? <SendIcon /> : null} onClick={mode === 'Login' ? LoginButton : RegisterButton}>
                    {mode === 'Login' ? 'Zaloguj' : 'Zarejestruj się'}
                </Button>
            </form>
            <div id="mode_switch">
                Logowanie<Switch defaultChecked={mode === 'Login' ? false : true} onChange={changeMode} color="default" key={mode}/>Rejestracja
            </div>
        </div>
    );
}

export default LoginAndRegisterForm;