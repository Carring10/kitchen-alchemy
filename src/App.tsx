import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Recipe } from "./pages/Recipe/Recipe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
