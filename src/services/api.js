// Categorias https://api.mercadolibre.com/sites/MLB/categories
export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Por categoria e termo https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Por termo https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
export async function getProductsFromQuery(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Por categoria https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
export async function getProductsFromCategory(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Detalhes item https://api.mercadolibre.com/items/$PRODUCT_ID
export async function getItemDetails(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
