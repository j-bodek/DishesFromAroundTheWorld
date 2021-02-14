const custom = function () {
  // // MENU
  // $(".nav-link").on("click", function () {
  //   $(".navbar-collapse").collapse("hide");
  // });

  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // // SMOOTH SCROLL
  // $(function () {
  //   $(".nav-link").on("click", function (event) {
  //     var $anchor = $(this);
  //     $("html, body")
  //       .stop()
  //       .animate(
  //         {
  //           scrollTop: $($anchor.attr("href")).offset().top - 0,
  //         },
  //         1000
  //       );
  //     event.preventDefault();
  //   });
  // });
};
custom();
