import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/utils.scss';
const app = require('./app')

console.log('Hello Coders! :)');

window.app = app;
window.addEventListener('DOMContentLoaded', () => {

    document.querySelector("#page-loader").remove();
    const nav = document.querySelector("#nav");
    const mobileNav = document.querySelector(".mobile-nav")

    app.renderListRestaurant('#list-restaurant')

    const select = document.querySelector("select#kota")

    select.addEventListener("change", function() {
        const selectedCity = document.querySelector("select#kota").selectedOptions[0].value || null
        window.cityFilter = selectedCity;
        app.renderListRestaurant('#list-restaurant')
    })

})