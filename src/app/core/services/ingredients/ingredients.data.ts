import { Category, Ingredient, SubCategory } from "./ingredients.interface";

export const INGREDIENTS: Ingredient[] = [
  {id: 0, name: 'Chicken Thigh', categoryID: 0,   subcategoryID: 1},
  {id: 1, name: 'Chicken Breast', categoryID: 0,  subcategoryID: 1},
  {id: 2, name: 'Garlic', categoryID: 1,          subcategoryID: 5},
  {id: 3, name: 'Yellow Onion', categoryID: 1,    subcategoryID: 5},
  {id: 4, name: 'Unsalted Butter', categoryID: 2, subcategoryID: 6},
  {id: 5, name: 'Tilapia', categoryID: 0,         subcategoryID: 2},
  {id: 7, name: 'Snow Peas', categoryID: 1,       subcategoryID: 3},
  {id: 8, name: 'American Cheese', categoryID: 2, subcategoryID: 7},
  {id: 9, name: 'Oat Milk', categoryID: 2,        subcategoryID: 6},
  {id: 10, name: 'Ribeye Steak', categoryID: 0,   subcategoryID: 0},
];

export const CATEGORIES: Category[] = [
  {id: 0, name: 'Meats, Poultry, and Seafood'},
  {id: 1, name: 'Vegetables'},
  {id: 2, name: 'Dairy'},
]

export const SUBCATEGORIES: SubCategory[] = [
  {id: 0, name: 'Meats', categoryID: 0},
  {id: 1, name: 'Poultry', categoryID: 0},
  {id: 2, name: 'Seafood', categoryID: 0},
  {id: 3, name: 'Beans and Peas', categoryID: 1},
  {id: 4, name: 'Starchy Vegetables', categoryID: 1},
  {id: 5, name: 'Other', categoryID: 1},
  {id: 6, name: 'Milk and Yogurt', categoryID: 2},
  {id: 7, name: 'Cheese', categoryID: 2},
]