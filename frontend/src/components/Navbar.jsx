import { Link, useLocation } from "react-router-dom";
import Diet from "../pages/Diet";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className={location.pathname === "/" ? "active" : ""}>
            Workout Buddy
          </h1>
        </Link>
        <Link to="/diet">
          <h1 className={location.pathname === "/diet" ? "active" : ""}>
            Diet
          </h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleLogout}> Log out</button>
          </div>
          <div>
            <Link to="/signup">Sign up</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
