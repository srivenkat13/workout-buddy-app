import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const {login} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info(email, password);
    await signup(email, password);
  };
  const handleGuestLogin = async () => {
    await login("test@test.com", "Test@222");
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign up</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />

      <button disabled={isLoading}>
        {isLoading ? "Loading...." : "Sign up"}
      </button>
      {error && <div className="error">{error}</div>}
      <div className="redirects">
      <Link to="/login">Already an User ? </Link>
      <Link to="/login" onClick={handleGuestLogin}>Guest user</Link>
      </div>
    </form>
  );
};

export default Signup;
