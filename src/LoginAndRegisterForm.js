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
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const changeMode = () =>{
        setMode(mode === 'Login' ? 'Register' : 'Login');
    }

    const LoginInput = (event) =>{
        setLogin(event.target.value);
    }
    const PasswordInput = (event) =>{
        setPassword(event.target.value);
    }
    const LoginButton = () =>{
        if(login !== '' && password !== ''){
            console.log('Login: ' + login + ' \nPassword: ' + password); //Sprawdzenie czy w bazie danych istnieje taki login i zweryfikowanie poprawności hasła
        }else if(login === '' && password === ''){
            console.log('Wszystkie dane wprowadzone są puste');
        }else if(login === ''){
            console.log("Wpisany login jest pusty");
        }else{
            console.log("Wpisane hasło jest puste");
        }
    }

    const RegisterButton = () =>{
        //Walidacja danych oraz zapis do bazy danych
    }
    
    if(mode === 'Login'){
        return(
            <div id="Login">
                <div id="titleDiv">
                    <p id="title">WHITEDANIELS BLACKJACK</p>
                </div>
                <form>
                    <Input placeholder="Login" onChange={LoginInput}></Input>
                    <Input placeholder="Hasło" onChange={PasswordInput}></Input>
                    <Button variant="contained" onClick={LoginButton} endIcon={<SendIcon />}>Zaloguj</Button>
                    <Button variant="outlined" onClick={changeMode}>Nie masz konta? Zarejestruj się poprzez naciśnięcie tego przycisku</Button>
                </form>
            </div>
        );
    }else{
        return(
            <div id="Register">
                <div id="titleDiv">
                    <p id="title">WHITEDANIELS BLACKJACK</p>
                </div>
                <form action="" method="POST">
                    <div id="forms">
                    <div id="form1">
                        <Input placeholder="Imie"/>
                        <Input placeholder="Nazwisko"/>
                        <FormControl fullWidth>
                            <Input type="date" placeholder="data urodzenia"/>
                        </FormControl>
                        <Input placeholder="email"/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Kraj</InputLabel>
                            <Select label="Kraj" labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="Argentyna">Argentyna</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="Belgia">Belgia</MenuItem>
                                <MenuItem value="Brazylia">Brazylia</MenuItem>
                                <MenuItem value="Brazylia">Brazylia</MenuItem>
                                <MenuItem value="Boliwia">Boliwia</MenuItem>
                                <MenuItem value="Kanada">Kanada</MenuItem>
                                <MenuItem value="Chile">Chile</MenuItem>
                                <MenuItem value="Chiny">Chiny</MenuItem>
                                <MenuItem value="Kongo">Kongo</MenuItem>
                                <MenuItem value="Czechy">Czechy</MenuItem>
                                <MenuItem value="Etiopia">Etiopia</MenuItem>
                                <MenuItem value="Filipiny">Filipiny</MenuItem>
                                <MenuItem value="Finlandia">Finlandia</MenuItem>
                                <MenuItem value="Grecja">Grecja</MenuItem>
                                <MenuItem value="Haiti">Haiti</MenuItem>
                                <MenuItem value="Honduras">Honduras</MenuItem>
                                <MenuItem value="Irak">Irak</MenuItem>
                                <MenuItem value="Irlandia">Irlandia</MenuItem>
                                <MenuItem value="Jamajka">Jamajka</MenuItem>
                                <MenuItem value="Japonia">Japonia</MenuItem>
                                <MenuItem value="Jordania">Jordania</MenuItem>
                                <MenuItem value="Kazachstan">Kazachstan</MenuItem>
                                <MenuItem value="Korea">Korea</MenuItem>
                                <MenuItem value="Niemcy">Niemcy</MenuItem>
                                <MenuItem value="Peru">Peru</MenuItem>
                                <MenuItem value="Polska">Polska</MenuItem>
                                <MenuItem value="Portugalia">Portugalia</MenuItem>
                                <MenuItem value="Paragwaj">Paragwaj</MenuItem>
                                <MenuItem value="Słowacja">Słowacja</MenuItem>
                                <MenuItem value="Słowenia">Słowenia</MenuItem>
                                <MenuItem value="Sudan">Sudan</MenuItem>
                                <MenuItem value="Szwajcaria">Szwajcaria</MenuItem>
                                <MenuItem value="Szwecja">Szwecja</MenuItem>
                                <MenuItem value="Turcja">Turcja</MenuItem>
                                <MenuItem value="Ukraina">Ukraina</MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                                <MenuItem value="Wenezuela">Wenezuela</MenuItem>
                                <MenuItem value="Walia">Walia</MenuItem>
                                <MenuItem value="Wielka Brytania">Wielka Brytania</MenuItem>
                                <MenuItem value="Włochy">Włochy</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div id="form2">
                        <Input placeholder="Miasto"/>
                        <Input placeholder="Adres"/>
                        <Input placeholder="Kod pocztowy"/>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Waluta</InputLabel>
                            <Select label="Waluta" labelId="demo-simple-select-label" id="demo-simple-select">
                                <MenuItem value="PLN">PLN</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="CNY">CNY</MenuItem>
                                <MenuItem value="AUD">AUD</MenuItem>
                                <MenuItem value="CAD">CAD</MenuItem>
                                <MenuItem value="CHF">CHF</MenuItem>
                            </Select>
                        </FormControl>
                        <Input placeholder="numer telefonu"/>
                    </div>
                    </div>
                    <Button variant="contained" color="success" onClick={RegisterButton}>Zarejestruj się</Button>
                    <Button variant="outlined" onClick={changeMode}>Masz już konto? Zaloguj się poprzez naciśnięcie tego przycisku</Button>
                </form>
            </div>
        );
    }
}

export default LoginAndRegisterForm;