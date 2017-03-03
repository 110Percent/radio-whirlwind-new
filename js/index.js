$(document).ready(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.whirlwind-player').load('/includes/player-mobile.html');
        console.log('me');
    } else {
        $('.whirlwind-player').load('/includes/player-desktop.html');
        console.log('irl');
    }
});