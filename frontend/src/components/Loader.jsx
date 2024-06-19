import React from "react";
import dbIcon from "../assets/fitness_center.svg";
import fdIcon from "../assets/grocery.svg";

const Loader = ({ icon }) => {
  return (
    <div className="loader">
      <img
        src={icon === "fitness_center" ? dbIcon : fdIcon}
        className="material-symbols-outlined"
      />
    </div>
  );
};

export default Loader;
