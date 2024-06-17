import { useEffect, useState } from "react";

import DietDetails from "../components/DietDetails";
const API = import.meta.env.VITE_API 

const Diet = () => {
  const [diets, setDiets] = useState([]);
  useEffect(() => {
    const fetchDiets = async () => {
      const response = await fetch(`${API}/api/diets/`);
      const json = await response.json();

      if (response.ok) {
        setDiets(json);
      }
    };

    fetchDiets();
  }, []);
  return (
    <div>
      <div>
        <h2>Diet List</h2>
        {diets.map((diet) => (
          <DietDetails key={diet._id} diet={diet} />
        ))}
      </div>
    </div>
  );
};

export default Diet;
