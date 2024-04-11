import { Category, Ingredient, SubCategory } from "./ingredients.interface";

export const INGREDIENTS: Ingredient[] = [
  {
    id: 0, 
    name: 'Chicken Thigh', 
    categoryID: 0,
    image: 'https://images.eatthismuch.com/img/480_erin_m_f8b9278d-504f-454b-b953-1a11fb2ba512.png',
  },
  {
    id: 1, 
    name: 'Chicken Breast', 
    categoryID: 0,
    image: 'https://joyce-farms.com/cdn/shop/products/naked_chicken_breast_new_2048x.jpeg?v=1600192812',
  },
  {
    id: 2, 
    name: 'Garlic', 
    categoryID: 1,
    image: 'https://www.vcuhealth.org/-/media/media/featurednewsimages/garlic-gloves.ashx'
  },
  {
    id: 3, 
    name: 'Yellow Onion', 
    categoryID: 1,
    image: 'https://specialtyproduce.com/sppics/689.png',
  },
  {
    id: 4, 
    name: 'Unsalted Butter', 
    categoryID: 2,
    image: 'https://images.ctfassets.net/ruek9xr8ihvu/7mtIFEhy992hwF55jKR2v2/2a5a03c7d4ef74e8b68865dbf8ca0211/Butter-for-Babies-scaled.jpg'
  },
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
]