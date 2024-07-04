import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Loader from "../components/Loader";

import { useFormContext } from "../hooks/useFormContext";
import { useAuthContext } from "../hooks/useAuthContext";
const API = import.meta.env.VITE_API;

const Home = () => { 
  const { wcontext } = useFormContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => { 
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API}/api/workouts/`, {
          headers: {
            "Authorization": `Bearer ${user.token} `,
          }, 
        });
        const json = await response.json();
        if (response.ok) {
          wcontext.dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError(true);
      } finally {
        setLoading(false);
      } 
    };
    if (user ) {
      fetchWorkouts();
    }
  }, [user]);

  return (
    <div className="home">
      {error ? (
        <div className="error"> Error Loading Workout Data</div>
      ) : (
        <div>
          {loading ? (
            <Loader icon="fitness_center" />
          ) : (
            <div className="workouts">
              {wcontext.workouts.length === 0  && <p className="no_content">No workouts added</p>}
              {wcontext.workouts &&
                wcontext.workouts.map((workout) => (
                  <motion.div
                    key={workout._id}
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
                  >
                    <WorkoutDetails workout={workout} />
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      )}

      <WorkoutForm />
    </div>
  );
};

export default Home;
