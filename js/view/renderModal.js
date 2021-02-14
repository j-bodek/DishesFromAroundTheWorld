class RenderModal {
  _modal = document.querySelector(".popup");

  _recipeData = {
    recipeName: "",
    recipeImg: "",
    recipeVideo: "",
    recipePreapere: "",
    recipeIngrediants: [],
  };

  _popupTitle = this._modal.querySelector("h1");

  addHandlerRenderModal(handler) {
    document.querySelector(".sidebar").addEventListener(
      "click",
      function (e) {
        const recipe = e.target.closest(".preview");
        if (!recipe) return;
        this.openAndCloseModal();
        // console.log();
        handler(recipe.id);
      }.bind(this)
    );
  }

  openAndCloseModal() {
    this._modal.classList.remove("popup-hidden");

    document.querySelector(".popup__close").addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        this._modal.classList.add("popup-hidden");
      }.bind(this)
    );

    document.querySelector(".popup__container").scrollTo(0, 0);
  }

  getIngrediants(data) {
    const ingrediants = this.filterObject(data, "strIngredient");

    //Get ingrediants measure
    const measures = this.filterObject(data, "strMeasure");

    let ingFinal = [];
    for (let i = 0; i < ingrediants.length; i++) {
      ingFinal.push(`${ingrediants[i]} / ${measures[i]}`);
    }

    // console.log(ingFinal);
    this._recipeData.recipeIngrediants = ingFinal;
  }

  filterObject(data, checkInclude) {
    let arr = [];
    for (const [key, value] of Object.entries(data)) {
      if (key.includes(checkInclude) && value !== "") arr.push(value);
    }
    return arr;
  }

  getRecipeBasic(data) {
    this._recipeData.recipeName = data.strMeal;
    this._recipeData.recipeImg = data.strMealThumb;
    this._recipeData.recipeVideo = data.strYoutube.replace(
      "watch?v=",
      "embed/"
    );
    this._recipeData.recipePreapere = data.strInstructions;
  }

  renderRecipeModal(data) {
    document.querySelector(".popup__h1").textContent = data.recipeName;

    document.querySelector(
      ".hero-image"
    ).style.backgroundImage = `url('${data.recipeImg}')`;

    document.querySelector(".img-fluid").src = data.recipeImg;

    const ingList = data.recipeIngrediants.map((e) => `<li>${e}</li>`).join("");

    document.querySelector(".gradient-list").innerHTML = "";
    document
      .querySelector(".gradient-list")
      .insertAdjacentHTML("beforeend", ingList);

    document.querySelector(".instruction").textContent = data.recipePreapere;

    if (document.querySelector(".video_cont"))
      document.querySelector(".video_cont").remove();

    if (data.recipeVideo === "") return;

    const video = `          <section
            class="about video_cont section-padding pb-0"
            style="margin-top: 10%; margin-bottom: 10%"
          >
            <div class="container">
              <div class="row">
                <div class="col-lg-7 mx-auto col-md-10 col-12">
                  <div class="about-info">
                    <h2 class="mb-4" data-aos="fade-up">
                      CHECK <strong>TUTORIAL</strong>
                    </h2>
    
                    <iframe
                    class="yt-video"
                      width="100%"
                      height="315"
                      src="${data.recipeVideo}"
                    >
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>`;

    document
      .querySelector(".popup__content")
      .insertAdjacentHTML("beforeend", video);
  }
}

export default new RenderModal();
