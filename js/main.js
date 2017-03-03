/*
    This JavaScript should apply to every page on the site.
*/


//Wait until the page has loaded
$(document).ready(() => {

    //Inject includes/header.html into the element with the "header" class
    $(".header").load("/includes/header.html");

    //Inject includes/footer.html into the element with the "footer" class
    $(".footer").load("/includes/footer.html", () => {

        //Once the footer is injected, inject the Copyright Text into the footer
        $(".copyright-text").text("© Radio Whirlwind 2014 - " + new Date().getUTCFullYear());
    });

    //Initialize styled objects for Materialize
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();

    //When the logo or header description text is clicked, return to the homepage
    $(document).on('click', '.to-home', () => {
        window.open("/", "_self");
    });

});