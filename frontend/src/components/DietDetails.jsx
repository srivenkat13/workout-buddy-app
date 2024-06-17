import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toSentenceCase } from "../utils/utility";

console.log(`%c working `, "background:blue; color:yellow");
const DietDetails = ({ diet }) => {
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
    </div>
  );
};
export default DietDetails;
