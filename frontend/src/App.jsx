import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Diet from "./pages/Diet";
import Navbar from "./components/Navbar";

function App() {
  const {user: Loggedin} = useAuthContext();
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={Loggedin ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!Loggedin ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!Loggedin ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/diet" element={<Diet />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
