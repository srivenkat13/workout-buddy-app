import { useState } from "react";
import { useFormContext } from "../hooks/useFormContext";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API;
const WorkoutForm = () => {
  const { wcontext } = useFormContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newWorkout = { title, load, reps };

    const response = await fetch(`${API}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle(""), setLoad(""), setReps(""), setError(null);
      setEmptyFields([]);
      console.log("new workout added", json);
      wcontext.dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  const handleFormVisibilty = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <form
        className={`create ${showForm ? "" : "hide"}`}
        onSubmit={handleSubmit}
      >
        <h3>Add a new Workout</h3>

        <label>Exercise Title:</label>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="e.g. bench press, leg press, pull up ..."
            className={emptyFields.includes("title") ? "error" : ""}
          />
        </div>
        <label>Load(Kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>

      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 1.5,
        }}
        className="toggle-form"
        onClick={handleFormVisibilty}
      >
        New
      </motion.button>
    </>
  );
};

export default WorkoutForm;
