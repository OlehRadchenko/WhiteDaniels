import './forms_style.css';

const FormRegister = () =>{
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
            </form>
        </div>
    );
}

export default FormRegister;