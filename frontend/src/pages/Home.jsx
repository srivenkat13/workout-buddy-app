import { useEffect } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
const API = import.meta.env.VITE_API 
const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // console.log(import.meta.env.VITE_API) 
      // TODO: Wrap this in try catch block
      const response = await fetch(`${API}/api/workouts/`);
      const json = await response.json();

      // json.map((workout) => console.log(workout.title));

      // json.forEach((workout) => {`
      //   console.log(workout.title);
      // });

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
