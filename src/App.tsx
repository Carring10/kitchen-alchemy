import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Recipe } from "./pages/Recipe/Recipe";
import { SavedRecipes } from "./pages/SavedRecipes/SavedRecipes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route path="/saved-recipes" element={<SavedRecipes />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
