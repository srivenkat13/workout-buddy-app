import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info(email,password)
    await signup(email, password);
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
      
      <button disabled={isLoading}>{isLoading ? 'Loading....' : 'Sign up' }</button>
      {error&& <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;