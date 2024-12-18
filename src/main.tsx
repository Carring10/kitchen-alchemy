import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MealContextProvider } from "./Context/mealContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MealContextProvider>
      <App />
    </MealContextProvider>
  </React.StrictMode>
);
