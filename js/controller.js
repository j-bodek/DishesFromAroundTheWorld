import * as map from "./view/map.js";
import RenderModal from "./view/renderModal.js";
import * as getCountryData from "./getCountryData.js";
import ModalView from "./view/modalView.js";

const generateModal = async function (id) {
  console.log(id);
  const data = getCountryData.recipeFullData(id);

  await data
    .then((res) => res.meals[0])
    .then((data) => {
      RenderModal.getIngrediants(data);
      RenderModal.getRecipeBasic(data);
    });

  // console.log(RenderModal._recipeData);

  RenderModal.renderRecipeModal(RenderModal._recipeData);
};

const init = function () {
  map.renderMap();
  RenderModal.addHandlerRenderModal(generateModal);
};
init();
