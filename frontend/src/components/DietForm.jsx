import { useRef, useState } from "react";
import { useFormContext } from "../hooks/useFormContext";

const API = import.meta.env.VITE_API;
const DietForm = () => {
  const {dcontext} = useFormContext();
  const [food, setFood] = useState("");
  const [portion, setPortion] = useState("");
  const [mName, setMName] = useState("");
  const [mWeight, setMWeight] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const FoodRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDiet = {
      food,
      portion,
      macros: {
        name: mName,
        weight: mWeight,
      },
    };

    try {
      const response = await fetch(`${API}/api/diets`, {
        method: "POST",
        body: JSON.stringify(newDiet),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError(result.error);
          setFood("");
          FoodRef.current.focus();
        } else {
          setError(result.error);
          setEmptyFields(result.emptyFields || []);
        }
      }
      if (response.ok) {
        setFood(""),
          setPortion(""),
          setMName(""),
          setMWeight(""),
          setError(null);
        setEmptyFields([]);
        console.log("new diet added", result);
        dcontext.dispatch({ type: "CREATE_DIET", payload: result });
      }
    } catch (error) {
      setError("Error occured while creating diet");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add new Meal</h3>
      <label>Meal Name:</label>
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setFood(e.target.value)}
          value={food}
          placeholder="e.g. eggs, spinach, chicken ..."
          ref={FoodRef}
          className={emptyFields.includes("food") ? "error" : ""}
        />
      </div>
      <label>Portion:</label>
      <input
        type="number"
        onChange={(e) => setPortion(e.target.value)}
        value={portion}
        placeholder="in grams"
        className={emptyFields.includes("portion") ? "error" : ""}
      />
      <label>Macro Name:</label>
      <input
        type="text"
        onChange={(e) => setMName(e.target.value)}
        value={mName}
        placeholder="protein, fat, carb..."
        required
      />
      <label>Marco Weight:</label>
      <input
        type="number"
        onChange={(e) => setMWeight(e.target.value)}
        value={mWeight}
        placeholder="amount of marco"
        required
      />
      <button>Add Meal</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DietForm;
