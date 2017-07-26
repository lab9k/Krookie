$(document).ready(function () {
    function loop() {
        $('#beentje').css({
            top: 0
        });
        $('#beentje').animate({
            top: '+=50vw',
        }, 2000, 'linear', function () {
            loop();
        });
    }
    loop();
});