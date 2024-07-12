import { Link, useLocation } from "react-router-dom";
import Diet from "../pages/Diet";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API;

const Navbar = () => {
  const location = useLocation();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [streak, setStreak] = useState(null);

  const handleLogout = () => {
    logout();
  };
  const userData = async () => {
    try {
      const response = await fetch(`${API}/api/users/userdata/`, {
        headers: {
          Authorization: `Bearer ${user.token} `,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await userData();
      setStreak(data.streak);
    };
    if (user) getData();
  }, [user]);

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
          {user && (
            <div>
              <span className="user">{user.email}</span>
              <button onClick={handleLogout}> Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Sign up</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
          {user && (
            <div>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.8, 1], transition: { duration: 0.5,  } }}
                whileHover={{ scale: 1.2 }}
              >
                🔥{streak}
              </motion.div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
