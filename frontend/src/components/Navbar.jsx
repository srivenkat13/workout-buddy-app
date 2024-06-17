import { Link, useLocation } from "react-router-dom";
import Diet from "../pages/Diet";

const Navbar = () => {
  const location = useLocation();
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
      </div>
    </header>
  );
};

export default Navbar;
