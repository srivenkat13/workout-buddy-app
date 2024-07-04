import { useAuthContext } from "./useAuthContext";
import { useFormContext } from "./useFormContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { wcontext } = useFormContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    wcontext.dispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
