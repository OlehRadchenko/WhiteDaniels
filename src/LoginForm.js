function LoginForm() {
    return (
      <div id="LoginForm">
        <input type="text" name="username" placeholder="Username"/><br/>
        <input type="password" name="password" placeholder="Password"/><br/>
        <input type="button" value="Zaloguj się"></input>
      </div>
    );
  }
  
  export default LoginForm;