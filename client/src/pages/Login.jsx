import "./styles/login.css";
function Login() {
  return (
    <main className="login-main">
      <form className="form form-control">
        <label>Username:</label>
        <input className="form-control" />

        <label>Password:</label>
        <input className="form-control"></input>
        <button>Login</button>
      </form>
    </main>
  );
}

export default Login;
