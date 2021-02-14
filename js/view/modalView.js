class ModalView {
  modalPreview(data) {
    const ingList = data.recipeIngrediants.map((e) => `<li>${e}</li>`).join("");

    //Return markup
    return `        <div class="popup__content">
         
        <!-- HERO -->
        <section
          class="hero hero-bg d-flex justify-content-center align-items-center"
        >
          <div class="container">
            <div class="row">
              <div
                class="col-lg-6 col-md-10 col-12 d-flex flex-column justify-content-center align-items-center"
              >
                <div class="hero-text">
                  <h1 data-aos="fade-up">
                    ${data.recipeName}
                  </h1>
                </div>
              </div>
  
              <div class="col-lg-6 col-12">
                <div
                  class="hero-image"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  style="border-radius: 100%"
                >
                  <img
                    src="https:\/\/www.themealdb.com\/images\/media\/meals\/st1ifa1583267248.jpg"
                    class="img-fluid"
                    alt="working girl"
                    style="opacity: 0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- ABOUT -->
        <section class="about section-padding pb-0" id="about">
          <div class="container">
            <div class="row">
              <div class="col-lg-7 mx-auto col-md-10 col-12">
                <div class="about-info">
                  <h2 class="mb-4" data-aos="fade-up">
                    RECIPE <strong>INGREDIENTS</strong>
                  </h2>
  
                  <ol class="gradient-list" data-aos="fade-up">
                    ${ingList}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Prepare  -->
        <section
          class="about section-padding pb-0"
          style="margin-top: 10%; margin-bottom: 10%"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-7 mx-auto col-md-10 col-12">
                <div class="about-info">
                  <h2 class="mb-4" data-aos="fade-up">
                    RECIPE <strong>PREPEAR</strong>
                  </h2>
  
                  <p class="mb-0" data-aos="fade-up">
                    ${data.recipePreapere}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Video -->
        <section
          class="about section-padding pb-0"
          style="margin-top: 10%; margin-bottom: 10%"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-7 mx-auto col-md-10 col-12">
                <div class="about-info">
                  <h2 class="mb-4" data-aos="fade-up">
                    CHECKOUT <strong>TUTORIAL</strong>
                  </h2>
  
                  <iframe
                    width="100%"
                    height="315"
                    src="${data.recipeVideo}"
                  >
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      
    </div>`;
  }
}

export default new ModalView();
