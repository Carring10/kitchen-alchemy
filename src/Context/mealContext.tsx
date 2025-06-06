import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the context
interface MealContextProps {
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
  selectedSubCat: { subCat: string; activeCategory: string };
  setSelectedSubCat: (subCategory: { subCat: string; activeCategory: string }) => void;
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

// Create the context with default values
// eslint-disable-next-line react-refresh/only-export-components
export const MealContext = createContext<MealContextProps>({
  selectedMeal: "",
  setSelectedMeal: () => {},
  selectedSubCat: { subCat: "", activeCategory: "" },
  setSelectedSubCat: () => {},
  searchTerm: "",
  setSearchTerm: () => {}
});

interface MealContextProviderProps {
  children: ReactNode;
}

// MealContextProvider implementation
export const MealContextProvider: React.FC<MealContextProviderProps> = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState(
    () => sessionStorage.getItem("meal") || ""
  );

  const [selectedSubCat, setSelectedSubCat] = useState(() => {
    const storedSubCat = sessionStorage.getItem("subCategory");
    return storedSubCat ? JSON.parse(storedSubCat) : { subCat: "", activeCategory: "" };
  });

  const [searchTerm, setSearchTerm] = useState(
    () => sessionStorage.getItem("search") || ""
  );

  // Sync the selectedMeal state with sessionStorage
  useEffect(() => {
    sessionStorage.setItem("meal", selectedMeal);
  }, [selectedMeal]);

  useEffect(() => {
    sessionStorage.setItem("subCategory", JSON.stringify(selectedSubCat));
  }, [selectedSubCat]);

  useEffect(() => {
    sessionStorage.setItem("search", searchTerm);
  }, [searchTerm]);
  
  return (
    <MealContext.Provider value={{ selectedMeal, setSelectedMeal, selectedSubCat, setSelectedSubCat, searchTerm, setSearchTerm }}>
      {children}
    </MealContext.Provider>
  );
};
