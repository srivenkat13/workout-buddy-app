import { useEffect, useState } from "react";

import DietDetails from "../components/DietDetails";
import Loader from "../components/Loader";
import DietForm from "../components/DietForm";
import { useFormContext } from "../hooks/useFormContext";
const API = import.meta.env.VITE_API;

const Diet = () => {
  const { dcontext } = useFormContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await fetch(`${API}/api/diets/`);
        const json = await response.json();

        if (response.ok) {
          dcontext.dispatch({ type: "SET_DIETS", payload: json });
        }
      } catch (error) {
        console.log("Error loading Diet", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDiets();
  }, []);
  if (error) {
    return <div className="error"> Error Loading Diet Data </div>;
  }
  return (
    <div className="home">
      {loading ? (
        <Loader icon="grocery" />
      ) : (
        <div>
          {dcontext.diets.map((diet) => (
            <DietDetails key={diet._id} diet={diet} />
          ))}
        </div>
      )}
      <DietForm />
    </div>
  );
};

export default Diet;
