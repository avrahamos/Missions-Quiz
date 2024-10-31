import React from "react";
import MissionsGridComponent from "./components/MissionsGrideComponent";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>Management of military missions</h1>
      <MissionsGridComponent />
    </div>
  );
};

export default App;
