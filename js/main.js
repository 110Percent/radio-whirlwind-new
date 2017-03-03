$(document).ready(() => {

    //Inject includes/header.html into the element with the "header" class.
    $(".header").load("/includes/header.html");
    $(".footer").load("/includes/footer.html", () => {
        $(".copyright-text").text("© Radio Whirlwind 2014 - " + new Date().getUTCFullYear());
    });

    $('.collapsible').collapsible();
    $('.tooltipped').tooltip({ delay: 50 });

    $(document).on('click', '.to-home', () => {
        window.open("/", "_self");
    });

});