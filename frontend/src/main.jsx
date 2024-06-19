import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { WorkoutsContextProvider } from "./context/WorkoutContext.jsx";
import { DietsContextProvider } from "./context/DietContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <DietsContextProvider>
      <App />
      </DietsContextProvider>
    </WorkoutsContextProvider>
  </React.StrictMode>
);
