import { Navbar } from "../Navbar/Navbar";
import { RecipeList } from "../RecipeList/RecipeList";
import "../../index.css";

export const Home = () => {
  return (
    <>
      <Navbar />
      <RecipeList />
    </>
  );
};
