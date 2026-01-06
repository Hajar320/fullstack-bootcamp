import { RecipeItem } from "./model/RecipeItem";
import { RecipeCollection } from "./model/RecipeCollection";
import { RecipeTemplate } from "./templates/RecipeTemplate";

class RecipeApp {
  private recipeCollection: RecipeCollection;
  private recipeTemplate: RecipeTemplate;
  private currentFilter: "all" | "favorites" = "all";

  constructor() {
    this.recipeCollection = new RecipeCollection();
    this.recipeTemplate = new RecipeTemplate();
    this.init();
  }

  private init(): void {
    this.bindFormSubmit();
    this.bindClearRecipes();
    this.bindFilterChange();
    this.bindRecipeActions();
    this.render();
  }

  private bindFormSubmit(): void {
    const form = document.getElementById("recipeEntryForm") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const titleInput = document.getElementById(
        "recipeTitle"
      ) as HTMLInputElement;
      const ingredientsInput = document.getElementById(
        "ingredients"
      ) as HTMLTextAreaElement;
      const instructionsInput = document.getElementById(
        "instructions"
      ) as HTMLTextAreaElement;

      const title = titleInput.value.trim();
      const ingredients = ingredientsInput.value
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const instructions = instructionsInput.value.trim();

      if (!title || ingredients.length === 0 || !instructions) {
        alert("Please fill in all fields");
        return;
      }

      const newRecipe = new RecipeItem(title, ingredients, instructions);
      this.recipeCollection.addRecipe(newRecipe);

      // Clear form
      form.reset();
      titleInput.focus();

      this.render();
    });
  }

  private bindClearRecipes(): void {
    const clearBtn = document.getElementById("clearRecipesButton");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (
          confirm(
            "Are you sure you want to clear all recipes? This action cannot be undone."
          )
        ) {
          this.recipeCollection.clearAll();
          this.render();
        }
      });
    }
  }

  private bindFilterChange(): void {
    this.recipeTemplate.bindFilterChange(
      () => {
        this.currentFilter = "all";
        this.render();
      },
      () => {
        this.currentFilter = "favorites";
        this.render();
      }
    );
  }

  private bindRecipeActions(): void {
    // Bind delete functionality
    this.recipeTemplate.bindDeleteRecipe((id: string) => {
      if (confirm("Are you sure you want to delete this recipe?")) {
        this.recipeCollection.removeRecipe(id);
        this.render();
      }
    });

    // Bind favorite toggle functionality
    this.recipeTemplate.bindToggleFavorite((id: string) => {
      this.recipeCollection.toggleFavorite(id);
      this.render();
    });
  }

  private render(): void {
    const recipes =
      this.currentFilter === "favorites"
        ? this.recipeCollection.getFavoriteRecipes()
        : this.recipeCollection.getAllRecipes();

    this.recipeTemplate.render(recipes, this.currentFilter === "favorites");
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new RecipeApp();
});
