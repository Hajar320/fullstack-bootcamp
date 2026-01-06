import { v4 as uuidv4 } from "uuid";

export interface IRecipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;
}

export class RecipeItem implements IRecipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  isFavorite: boolean;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  update(title: string, ingredients: string[], instructions: string): void {
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}
