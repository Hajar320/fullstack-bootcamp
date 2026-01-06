import DataFetcher from "./components/DataFetcher";
import type { Recipe } from "./types/types";
import "./App.css";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

function App() {
  return (
    <div className="App">
      <h1>Recipes</h1>

      <DataFetcher<Recipe[]>
        url={`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`}
        render={(recipes) => (
          <ul>
            {recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <h2>{recipe.title}</h2>
                <img src={recipe.image} alt={recipe.title} />
              </div>
            ))}
          </ul>
        )}
      />
    </div>
  );
}

export default App;
