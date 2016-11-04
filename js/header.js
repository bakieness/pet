$('.toggle').on('click', function () {

    var navHeight = $('.links').height();
    var newNavHeight = $('.links').height() + 125;

    if (navHeight == 0) {
        $('.links').animate({ 'height': newNavHeight + 'px' }, 400)
        $('.mainview').animate({ 'margin-top': newNavHeight + 'px' }, 400)
    } else {
        $('.links').animate({ 'height': '0' }, 400)
        $('.mainview').animate({ 'margin-top': '0' }, 400)
    }
});

$('.primary').on('click', function () {

    $('.links').css('height', 0);
    $('.mainview').css('margin-top', 0);
});