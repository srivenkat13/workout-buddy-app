import { createContext, useReducer } from "react";

export const DietsContext = createContext();

export const DietsReducer = (state, action) => {
  switch (action.type) {
    case "SET_DIETS":
      return {
        diets: action.payload
      };
    case "CREATE_DIET":
      return {
        diets:[action.payload, ...state.diets]
      };

    case "DELETE_DIET":
      return {
        diets: state.diets.filter((d)=> d._id !== action.payload._id)
      };

    default:
      return state;
  }
};

export const DietsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DietsReducer, { diets: null });
  return (
    <DietsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DietsContext.Provider>
  );
};
