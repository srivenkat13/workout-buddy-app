import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.info(email, password);
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button disabled={isLoading}>
        {isLoading ? "Loading...." : "Login"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
