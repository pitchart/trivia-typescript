enum Category {
  Pop = 'Pop',
  Science = 'Science',
  Sports = 'Sports',
  Rock = 'Rock',
}

export const categoryArray = Object.keys(Category);
export const numberOfCategories = categoryArray.length;

export default Category;
