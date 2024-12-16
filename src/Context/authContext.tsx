import React, { createContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the context
interface AuthContextProps {
  selectedMeal: string;
  setSelectedMeal: (meal: string) => void;
}

// Create the context with default values
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextProps>({
  selectedMeal: "",
  setSelectedMeal: () => {},
});

console.log(AuthContext)

interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider implementation
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(sessionStorage.getItem("meal"))

  useEffect(() => {
    console.log(sessionStorage.getItem("meal"))
  }, [])

  // Sync the selectedMeal state with sessionStorage
  useEffect(() => {
    sessionStorage.setItem("meal", JSON.stringify(selectedMeal));
    console.log(selectedMeal)
  }, [selectedMeal]);

  console.log(selectedMeal);

  return (
    <AuthContext.Provider value={{ selectedMeal, setSelectedMeal }}>
      {children}
    </AuthContext.Provider>
  );
};
