import { useEffect, useState } from "react";

import DietDetails from "../components/DietDetails";
import Loader from "../components/Loader";
import DietForm from "../components/DietForm";

import { useFormContext } from "../hooks/useFormContext";
import { useAuthContext } from "../hooks/useAuthContext";
const API = import.meta.env.VITE_API;

const Diet = () => {
  const { dcontext } = useFormContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const response = await fetch(`${API}/api/diets/`, {
          headers: {
            Authorization: `Bearer ${user.token} `,
          },
        });
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
    if (user) {
      fetchDiets();
    }
  }, [user]);
  if (error) {
    return <div className="error"> Error Loading Diet Data </div>;
  }
  return (
    <div className="home">
      {loading ? (
        <Loader icon="grocery" />
      ) : (
        <div>
           {dcontext.diets.length === 0  && <p className="no_content">No diets found</p>}
          {dcontext.diets &&
            dcontext.diets.map((diet) => (
              <DietDetails key={diet._id} diet={diet} />
            ))}
        </div>
      )}
      <DietForm />
    </div>
  );
};

export default Diet;
