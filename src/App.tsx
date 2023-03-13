import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default App;
