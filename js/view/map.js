import * as data from "../getCountryData.js";
import renderMeals from "./renderMeals.js";
import { Countries } from "./countries.js";

export const currentCountry = {
  name: "",
  countryMeals: {},
};

export const renderMap = function () {
  let map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 2,
      maxZoom: 5,
      ext: "jpg",
    }
  ).addTo(map);

  // Add Countries names states etc

  // L.tileLayer(
  //   "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}",
  //   {
  //     attribution:
  //       'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //     subdomains: "abcd",
  //     minZoom: 2,
  //     maxZoom: 5,
  //     ext: "png",
  //   }
  // ).addTo(map);

  geojson = L.geoJson(Countries).addTo(map);

  function style(feature) {
    return {
      fillColor: "#00af91",
      weight: 3,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.1,
    };
  }

  L.geoJson(Countries, { style: style }).addTo(map);

  function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 5,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  var geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function zoomToFeatureAndChangeCollor(e) {
    map.fitBounds(e.target.getBounds());
  }

  async function getClickedCountry(layer) {
    currentCountry.name = layer.feature.properties.name;
    // console.log(this.currentCountry);
    // console.log(currentCountry);
    const transformadName = data.transformCountryName(currentCountry.name);

    const name = await transformadName.then((res) => {
      currentCountry.countryMeals = data
        .getCountryDishes(res)
        .then((res) => res);
    });

    currentCountry.countryMeals.then((res) => {
      renderMeals.renderMarkup(res, currentCountry.name);
    });
  }

  function onEachFeature(feature, layer) {
    layer.bindPopup(layer.feature.properties.name);
    layer.addEventListener("click", () => getClickedCountry(layer));

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeatureAndChangeCollor,
    });
  }

  geojson = L.geoJson(Countries, {
    style: style,
    onEachFeature: onEachFeature,
  }).addTo(map);
};
