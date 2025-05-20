import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { RecipePage } from "./pages/Recipe/RecipePage";
import { SavedRecipes } from "./pages/SavedRecipes/SavedRecipes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipe" element={<RecipePage />}></Route>
          <Route path="/saved-recipes" element={<SavedRecipes />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
