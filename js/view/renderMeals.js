class renderMeals {
  _recipies = {};

  _sidebar = document.querySelector(".sidebar");

  _currPage;

  _maxPage;

  renderMarkup(data, country) {
    this._sidebar.innerHTML = "";
    this._sidebar.insertAdjacentHTML(
      "beforeend",
      this.generateMarkupFirst(data, country)
    );

    if (!document.querySelector(".previous")) return;
    //Pagination btns

    document
      .querySelector(".previous")
      .addEventListener("click", this.previousPage.bind(this));

    document
      .querySelector(".next")
      .addEventListener("click", this.nextPage.bind(this));
  }

  generateMarkupFirst(data, country) {
    if (!data.meals)
      return `<h1 data-aos="fade-up" class="sidebar-title">
Sorry we don't have any recipies for ${country}
</h1>`;
    this._recipies = data.meals;
    this._currPage = 0;
    this._maxPage = Math.floor(data.meals.length / 5);
    return this.markupPreview(this._currPage);
  }

  markupPreview(currPage, handler = "") {
    const recipiesPage = this._recipies.slice(
      0 + 5 * currPage,
      5 + 5 * currPage
    );
    // console.log(recipiesPage);
    const meals = recipiesPage
      .map((meal) => {
        return `
      <li id = "${meal.idMeal}" class="preview">
      <a class="preview__link preview__link--active" href="#">
        <figure class="preview__fig">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${meal.strMeal}</h4>
        </div>
      </a>
    </li>
      `;
      })
      .join("");

    if (handler === "pagination") return meals;

    const mealsResult = `
    <ul class="results">${meals}</ul>
    <div class="pagination p8">
    <ul>
      <a class="previous" href="#"><li><</li></a>
      <a class="next" href="#"><li>></li></a>
    </ul>
  </div>`;
    return mealsResult;
  }

  nextPage() {
    if (this._maxPage === this._currPage) return;

    this._currPage += 1;

    // console.log(this._currPage);

    document.querySelector(".results").innerHTML = "";
    document
      .querySelector(".results")
      .insertAdjacentHTML(
        "beforeend",
        this.markupPreview(this._currPage, "pagination")
      );
  }
  previousPage() {
    if (this._currPage === 0) return;

    this._currPage -= 1;

    // console.log(this._currPage);

    document.querySelector(".results").innerHTML = "";
    document
      .querySelector(".results")
      .insertAdjacentHTML(
        "beforeend",
        this.markupPreview(this._currPage, "pagination")
      );
  }
}

export default new renderMeals();
