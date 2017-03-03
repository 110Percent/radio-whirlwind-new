/*
    This JavaScript will only apply to index.html (homepage)
*/


//Wait until page has loaded
$(document).ready(() => {

    //Detect if the browser belongs to a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        //If the browser is mobile, inject the mobile-formatted stream player into the element with the class 'whirlwind-player'
        $('.whirlwind-player').load('/includes/player-mobile.html');
        console.log('Injected Mobile Player.');

    } else {

        //If the browser is NOT mobile, inject the desktop-formatted stream player instead
        $('.whirlwind-player').load('/includes/player-desktop.html');
        console.log('Injected Desktop Player.');

    }
});