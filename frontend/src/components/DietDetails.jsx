import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toSentenceCase } from "../utils/utility";
import { useFormContext } from "../hooks/useFormContext";

const API = import.meta.env.VITE_API;

console.log(`%c working `, "background:blue; color:yellow");
const DietDetails = ({ diet }) => {
  const { dcontext } = useFormContext();
  const handleClick = async () => {
    const response = await fetch(`${API}/api/diets/` + diet._id, {
      method: "DELETE",
    });

    const json = await response.json();
    console.info(json)

    if (response.ok) {
      dcontext.dispatch({ type: "DELETE_DIET", payload: json });
    }
  };

  return (
    <div className="diet-container">
      <h4>{toSentenceCase(diet.food)}</h4>
      <p>
        <strong>Portion:</strong> {diet.portion} grams
      </p>
      <p>
        {" "}
        <strong>Macros:</strong> {diet.macros.name} - {diet.macros.weight}
      </p>
      <p className="time">
        {formatDistanceToNow(new Date(diet.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};
export default DietDetails;
