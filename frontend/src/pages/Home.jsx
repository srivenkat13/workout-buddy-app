import { useEffect, useState } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import Loader from "../components/Loader";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const API = import.meta.env.VITE_API;

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${API}/api/workouts/`);
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_WORKOUTS", payload: json });
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

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
              {workouts &&
                workouts.map((workout) => (
                  <WorkoutDetails key={workout._id} workout={workout} />
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
