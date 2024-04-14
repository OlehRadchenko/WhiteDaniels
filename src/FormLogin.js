import './forms_style.css';

const FormLogin = () =>{
    return(
        <div id="Login">
            <div id="titleDiv">
                <p id="title">WHITEDANIELS BLACKJACK</p>
            </div>
            <form>
                <input type="text" name="login" placeholder="Login" />
                <input type="password" name="haslo" placeholder="Hasło" />
                <input type="submit" value="Zaloguj" />
                <a href="register.html">Zarejestruj</a>
            </form>
        </div>
    );
}

export default FormLogin;