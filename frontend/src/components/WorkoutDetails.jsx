import { useFormContext } from "../hooks/useFormContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import {toSentenceCase} from "../utils/utility"

const API = import.meta.env.VITE_API

const WorkoutDetails = ({ workout }) => {
  const {wcontext } = useFormContext();
  const handleClick = async () => {
    const response = await fetch(
      `${API}/api/workouts/`+ workout._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      wcontext.dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

 
  return (
    <div className="workout-details">
      <h4>{toSentenceCase(workout.title)}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load === 0 ? "Body Weight" : workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
