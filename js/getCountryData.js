export const getCountryDishes = async function (countryName) {
  return await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

export const transformCountryName = async function (country) {
  return await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((res) => res.json())
    .then((data) => data[0].demonym)
    .catch((err) => "null");
};

export const recipeFullData = async function (mealId) {
  return await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  ).then((res) => res.json());
};
