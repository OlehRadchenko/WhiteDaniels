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
import { io } from 'socket.io-client';

const LoginAndRegisterForm = () =>{
    const [mode, setMode] = useState('Login');
    const [email_login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeatPassword] = useState('');
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
    const [repeat_password_error, setRepeatPasswordError] = useState(false);
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
    const socket = io('http://localhost:5000');
    
    socket.on('login_success', (data) => {
        console.log('Pomyślne logowanie:', data.message);
        console.log(data.usersActive);
        setRedirect(<Navigate to='/blackjack' state={{ user: data.user }}/>);
    });
    socket.on('login_error', (data) => {
        console.log('Błąd podczas logowania:', data.message);
        setEmailLoginError(data.loginError);
        setPasswordError(data.passwordError);
    });
    socket.on('register_error', (data) => {
        console.log('Błąd podczas rejestracji:', data.message);
        setEmailError(true);
    });
    socket.on('register_success', (data) => {
        console.log('Rejestracja pomyślna:', data.message);
        setRedirect(<Navigate to='/'/>);
    });
    const changeMode = () =>{
        setMode(mode === 'Login' ? 'Register' : 'Login');
    }

    const EmailLoginInput = (event) =>{
        setLogin(event.target.value);
    }
    const PasswordInput = (event) =>{
        setPassword(event.target.value);
    }
    const RepeatPasswordInput = (event) =>{
        setRepeatPassword(event.target.value);
    }
    const LoginButton = () => {
        try {
            if(email_login !== '' && password !== ''){
                socket.emit('login', { email_login, password });
            } else if (email_login === '' && password === ''){
                setEmailLoginError(true);
                setPasswordError(true);
            } else if (email_login === ''){
                setEmailLoginError(true);
                setPasswordError(false);
            } else {
                setPasswordError(true);
                setEmailLoginError(false);
            }
        }
        catch (error) {
            console.error('Error logging in:', error);
        }
    };

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

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }
    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }
    const validatePostalCode = (postalCode) => {
        return /^\d{2}-\d{3}$/.test(postalCode);
    }
    const validateAge = (myBirthDate) => {
        const today = new Date();
        const birthDate = new Date(myBirthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            age--;
        if (age < 18) {
            return false;
        }
        else{
            return true;
        }
    }
    const otherValidate = (value, funct) => {
        if (value === '') {
            funct(true);
            isValid = false;
        } else {
            funct(false);
        }
    }
    const RegisterButton = async () =>{
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

        if (password === '' || !validatePassword(password)) {
            isValid = false;
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (repeat_password === '' || repeat_password !== password) {
            isValid = false;
            setRepeatPasswordError(true);
        } else {
            setRepeatPasswordError(false);
        }
        
        if (dataUro === '' || !validateAge(dataUro)) {
            isValid = false;
            setDataUroError(true);
        } else {
            setDataUroError(false);
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

        validateAge(dataUro);

        console.log(isValid)

        if(isValid){
            console.log(imie + '\n' + password + '\n' + nazwisko + '\n' + dataUro + '\n' + email + '\n' + kraj + '\n' + miasto + '\n' + adres + '\n' + kod_pocztowy + '\n' + waluta + '\n' + nr_tel);
            const newUser = {
                email,
                password,  
                imie,
                nazwisko,
                dataUro,
                kraj,
                miasto,
                adres,
                kod_pocztowy,
                waluta,
                nr_tel
            };
            socket.emit('register', newUser);
        }
    }

    return(
        <div id="topContainer">
            <div className="reklama">
                {/* <img src={require('./icons/pozyczka.png')} alt='logo'/> */}
            </div>

            <div id={mode === 'Login' ? 'Login' : 'Register'} className="mainContainer">
                {redirect}
                <div id="titleDiv">
                    <img id="logo" src={require('./icons/logo.png')} alt='logo' />
                    <p id="title" style={{ fontFamily: "Cinzel" }}>WHITE DANIELS</p>
                </div>
                <div id="Blackjack">
                    <div id="menu">
                        <form>
                            {mode === 'Login' ? (
                                <>
                                    <Input placeholder="Email" onChange={EmailLoginInput} error={email_login_error} />
                                    <Input placeholder="Hasło" type="password" onChange={PasswordInput} error={password_error} />
                                </>
                            ) : (
                                <>
                                    <div id="forms">
                                        <div id="form1">
                                            <Input placeholder="Imie" onChange={ImieInput} error={imie_error} />
                                            <Input placeholder="Nazwisko" onChange={NazwiskoInput} error={nazwisko_error} />
                                            <Input placeholder="Email" onChange={EmailInput} error={email_error} />
                                            <Input placeholder="Hasło" type="password" onChange={PasswordInput} error={password_error} />
                                            <Input placeholder="Powtórz Hasło" type="password" onChange={RepeatPasswordInput} error={repeat_password_error} />
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Kraj</InputLabel>
                                                <Select style={{ color: 'white' }} value={kraj} label="Kraj" labelId="demo-simple-select-label" id="demo-simple-select" onChange={KrajInput} error={kraj_error}>
                                                    {kraje.map((kraj, index) => <MenuItem key={index} value={kraj}>{kraj}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div id="form2">
                                            <FormControl fullWidth>
                                                <Input type="date" placeholder="Data urodzenia" onChange={DataUroInput} error={dataUro_error} />
                                            </FormControl>
                                            <Input placeholder="Miasto" onChange={MiastoInput} error={miasto_error} />
                                            <Input placeholder="Adres" onChange={AdresInput} error={adres_error} />
                                            <Input placeholder="Kod pocztowy" onChange={KodPocztowyInput} error={kod_pocztowy_error} />
                                            <Input placeholder="Numer telefonu" onChange={NrTelInput} error={nr_tel_error} />
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Waluta</InputLabel>
                                                <Select style={{ color: 'white' }} value={waluta} label="Waluta" labelId="demo-simple-select-label" id="demo-simple-select" onChange={WalutaInput} error={waluta_error}>
                                                    {waluty.map((waluta, index) => <MenuItem key={index} value={waluta}>{waluta}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </>
                            )}
                            <br/>
                            <Button variant="contained" color="success" endIcon={mode === 'Login' ? <SendIcon /> : null} onClick={mode === 'Login' ? LoginButton : RegisterButton}>
                                {mode === 'Login' ? 'Zaloguj' : 'Zarejestruj się'}
                            </Button>
                            <br/>
                        </form>
                        <div id="mode_switch">
                            Logowanie<Switch defaultChecked={mode === 'Login' ? false : true} onChange={changeMode} color="default" key={mode} />Rejestracja
                        </div>
                    </div>
                </div>
            </div>

            <div className="reklama">
                {/* <img src={require('./icons/pozyczka2.png')} alt='logo'/> */}
            </div>
        </div>
    );
}

export default LoginAndRegisterForm;