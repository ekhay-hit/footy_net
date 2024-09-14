import "./styles/singup.css";
function Signup() {
  return (
    <main className="signup-main">
      <form className="form form-control">
        <label>Username:</label>
        <input className="form-control" />

        <label>email:</label>
        <input className="form-control" />

        <label>Password:</label>
        <input className="form-control"></input>
        <button>Signup</button>
      </form>
    </main>
  );
}

export default Signup;
