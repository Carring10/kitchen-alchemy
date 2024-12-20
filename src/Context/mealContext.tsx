import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the context
interface MealContextProps {
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
  selectedSubCat: string;
  setSelectedSubCat: (subCategory: string) => void;
}

// Create the context with default values
// eslint-disable-next-line react-refresh/only-export-components
export const MealContext = createContext<MealContextProps>({
  selectedMeal: "",
  setSelectedMeal: () => {},
  selectedSubCat: "",
  setSelectedSubCat: () => {}
});

interface MealContextProviderProps {
  children: ReactNode;
}

// MealContextProvider implementation
export const MealContextProvider: React.FC<MealContextProviderProps> = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState(
    () => sessionStorage.getItem("meal") || ""
  );

  const [selectedSubCat, setSelectedSubCat] = useState(
    () => sessionStorage.getItem("subCategory") || ""
  );

  // Sync the selectedMeal state with sessionStorage
  useEffect(() => {
    sessionStorage.setItem("meal", selectedMeal);
  }, [selectedMeal]);

  useEffect(() => {
    sessionStorage.setItem("subCategory", selectedSubCat);
  }, [selectedSubCat]);
  
  return (
    <MealContext.Provider value={{ selectedMeal, setSelectedMeal, selectedSubCat, setSelectedSubCat }}>
      {children}
    </MealContext.Provider>
  );
};
