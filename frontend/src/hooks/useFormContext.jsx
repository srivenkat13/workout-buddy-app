import { WorkoutsContext } from "../context/WorkoutContext";
import {DietsContext} from "../context/DietContext"

import { useContext } from "react";

export const useFormContext = () => {
  const wcontext = useContext(WorkoutsContext);
  const dcontext =useContext(DietsContext)

  if (!wcontext || !dcontext) {
    throw Error(
      "useFormContext must be used inside and WorkoutsContextProvider"
    );
  }

  return {wcontext,dcontext};
};
