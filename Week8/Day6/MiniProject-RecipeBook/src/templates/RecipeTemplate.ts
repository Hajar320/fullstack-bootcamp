import { RecipeItem } from "../model/RecipeItem";

export class RecipeTemplate {
  private recipeContainer: HTMLElement;
  private showFavoritesOnly: boolean = false;

  constructor(containerId: string = "recipeContainer") {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container element with id "${containerId}" not found`);
    }
    this.recipeContainer = container;
  }

  render(recipes: RecipeItem[], favoritesOnly: boolean = false): void {
    this.showFavoritesOnly = favoritesOnly;

    const filteredRecipes = favoritesOnly
      ? recipes.filter((recipe) => recipe.isFavorite)
      : recipes;

    if (filteredRecipes.length === 0) {
      this.renderEmptyState(favoritesOnly);
      return;
    }

    this.recipeContainer.innerHTML = "";

    filteredRecipes.forEach((recipe) => {
      const recipeCard = this.createRecipeCard(recipe);
      this.recipeContainer.appendChild(recipeCard);
    });
  }

  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement("div");
    card.className = `recipe-card ${recipe.isFavorite ? "favorite" : ""}`;
    card.dataset.id = recipe.id;

    const header = this.createRecipeHeader(recipe);
    const content = this.createRecipeContent(recipe);

    card.appendChild(header);
    card.appendChild(content);

    return card;
  }

  private createRecipeHeader(recipe: RecipeItem): HTMLElement {
    const header = document.createElement("div");
    header.className = "recipe-header";

    const title = document.createElement("h2");
    title.className = "recipe-title";
    title.textContent = recipe.title;

    const actions = document.createElement("div");
    actions.className = "recipe-actions";

    // Favorite button
    const favoriteBtn = document.createElement("button");
    favoriteBtn.className = "action-btn favorite-btn";
    favoriteBtn.innerHTML = recipe.isFavorite
      ? '<i class="fas fa-star"></i>'
      : '<i class="far fa-star"></i>';
    favoriteBtn.title = recipe.isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "action-btn delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = "Delete recipe";

    actions.appendChild(favoriteBtn);
    actions.appendChild(deleteBtn);
    header.appendChild(title);
    header.appendChild(actions);

    return header;
  }

  private createRecipeContent(recipe: RecipeItem): HTMLElement {
    const content = document.createElement("div");
    content.className = "recipe-content";

    // Ingredients section
    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.className = "section-title";
    ingredientsTitle.textContent = "Ingredients";
    content.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "ingredients-list";

    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient.trim();
      ingredientsList.appendChild(li);
    });
    content.appendChild(ingredientsList);

    // Instructions section
    const instructionsTitle = document.createElement("h3");
    instructionsTitle.className = "section-title";
    instructionsTitle.textContent = "Instructions";
    content.appendChild(instructionsTitle);

    const instructions = document.createElement("div");
    instructions.className = "instructions";
    instructions.textContent = recipe.instructions;
    content.appendChild(instructions);

    return content;
  }

  private renderEmptyState(favoritesOnly: boolean): void {
    this.recipeContainer.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-${favoritesOnly ? "star" : "utensils"}"></i>
        <h3>${favoritesOnly ? "No favorite recipes yet" : "No recipes yet"}</h3>
        <p>${favoritesOnly ? "Mark some recipes as favorites to see them here!" : "Add your first recipe using the form above!"}</p>
      </div>
    `;
  }

  bindDeleteRecipe(handler: (id: string) => void): void {
    this.recipeContainer.addEventListener("click", (event) => {
      const deleteBtn = (event.target as HTMLElement).closest(".delete-btn");
      if (deleteBtn) {
        const recipeCard = deleteBtn.closest(".recipe-card") as HTMLElement;
        if (recipeCard && recipeCard.dataset.id) {
          handler(recipeCard.dataset.id);
        }
      }
    });
  }

  bindToggleFavorite(handler: (id: string) => void): void {
    this.recipeContainer.addEventListener("click", (event) => {
      const favoriteBtn = (event.target as HTMLElement).closest(
        ".favorite-btn"
      );
      if (favoriteBtn) {
        const recipeCard = favoriteBtn.closest(".recipe-card") as HTMLElement;
        if (recipeCard && recipeCard.dataset.id) {
          handler(recipeCard.dataset.id);
        }
      }
    });
  }

  bindFilterChange(
    showAllHandler: () => void,
    showFavoritesHandler: () => void
  ): void {
    const showAllBtn = document.getElementById("showAll");
    const showFavoritesBtn = document.getElementById("showFavorites");

    if (showAllBtn && showFavoritesBtn) {
      showAllBtn.addEventListener("click", () => {
        showAllBtn.classList.add("active");
        showFavoritesBtn.classList.remove("active");
        showAllHandler();
      });

      showFavoritesBtn.addEventListener("click", () => {
        showFavoritesBtn.classList.add("active");
        showAllBtn.classList.remove("active");
        showFavoritesHandler();
      });
    }
  }
}
