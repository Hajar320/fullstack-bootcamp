import { RecipeItem, IRecipe } from "./RecipeItem";

export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly storageKey = "recipeBook";

  constructor() {
    this.loadFromLocalStorage();
  }

  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToLocalStorage();
  }

  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.saveToLocalStorage();
  }

  getRecipe(id: string): RecipeItem | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  getAllRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  getFavoriteRecipes(): RecipeItem[] {
    return this.recipes.filter((recipe) => recipe.isFavorite);
  }

  toggleFavorite(id: string): void {
    const recipe = this.getRecipe(id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToLocalStorage();
    }
  }

  updateRecipe(
    id: string,
    title: string,
    ingredients: string[],
    instructions: string
  ): void {
    const recipe = this.getRecipe(id);
    if (recipe) {
      recipe.update(title, ingredients, instructions);
      this.saveToLocalStorage();
    }
  }

  clearAll(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    const recipesData = this.recipes.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      isFavorite: recipe.isFavorite,
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(recipesData));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      const recipesData: IRecipe[] = JSON.parse(stored);
      this.recipes = recipesData.map(
        (data) =>
          new RecipeItem(
            data.title,
            data.ingredients,
            data.instructions,
            data.isFavorite,
            data.id
          )
      );
    }
  }
}
