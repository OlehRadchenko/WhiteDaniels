function LoginForm(props){
  if(props.style === "login"){
    return (
      <div id="LoginForm">
        <input type="text" name="username" placeholder="Username"/><br/>
        <input type="password" name="password" placeholder="Password"/><br/>
        <input type="button" value="Zaloguj się"></input><br/>
        Nie posiadasz konta? To <a href="">załóż konto</a>
      </div>
    );
  }else if(props.style === "register"){
    return (
      <div id="RegisterForm">
        STRONA REJESTRACJI
        <input type="text" name="name" placeholder="imie"/><br/>
        <input type="text" name="surname" placeholder="nazwisko"/><br/>
        <input type="date" name="birth_date" placeholder="data urodzenia"/><br/>
        <input type="text" name="email" placeholder="email"/><br/>
        <input type="text" name="kraj" placeholder="kraj"/><br/>
        <input type="text" name="city" placeholder="miasto"/><br/>
        <input type="text" name="adres" placeholder="adres"/><br/>
        <input type="number" name="adres2" placeholder="nr mieszkania"/><br/>
        <input type="text" name="postal_code" placeholder="kod pocztowy"/><br/>
        <input type="text" name="currency" placeholder="waluta"/><br/>
        <input type="text" name="phone_number" placeholder="nr telefonu"/><br/>
        <input type="button" value="Zarejestruj się"></input><br/>
        Posiadasz już konto? To <a href="">zaloguj się</a>
      </div>
    );
  }
  }
  
  export default LoginForm;