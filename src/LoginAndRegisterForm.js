import './forms_style.css';
import { useState } from 'react';

const LoginAndRegisterForm = () =>{
    const [mode, setMode] = useState('Login');
    const changeMode = () =>{
        setMode(mode === 'Login' ? 'Register' : 'Login');
    }
    
    if(mode === 'Login'){
        return(
            <div id="Login">
                <div id="titleDiv">
                    <p id="title">WHITEDANIELS BLACKJACK</p>
                </div>
                <form>
                    <input type="text" name="login" placeholder="Login" />
                    <input type="password" name="haslo" placeholder="Hasło" />
                    <input type="submit" value="Zaloguj" />
                    <input type="button" value="Nie masz konta? Zarejestruj się poprzez naciśnięcie tego przycisku" onClick={changeMode}/>
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
                        <input type="text" name="imie" placeholder="imie" />
                        <input type="text" name="nazwisko" placeholder="nazwisko" />
                        <input type="text" name="dataUro" placeholder="data urodzenia" />
                        <input type="text" name="email" placeholder="email" />
                        <input type="text" name="kraj" placeholder="kraj" />
                    </div>
                    <div id="form2">
                        <input type="text" name="miasto" placeholder="miasto" />
                        <input type="text" name="adres" placeholder="adres" />
                        <input type="text" name="kodPocztowy" placeholder="kod pocztowy" />
                        <input type="text" name="waluta" placeholder="waluta" />
                        <input type="text" name="telefon" placeholder="telefon" />
                    </div>
                    </div>
                    <input type="submit" value="Zarejestruj" />
                    <input type="button" value="Masz już konto? Zaloguj się poprzez naciśnięcie tego przycisku" onClick={changeMode}/>
                </form>
            </div>
        );
    }
}

export default LoginAndRegisterForm;