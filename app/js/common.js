$(function () {

    /**
     * main-menu
     **/
    var menu = $('.hide-menu');
    var sandwich = $('#sandwich');
    sandwich.on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
        sandwich.toggleClass('active');
    });
    $(window).resize(function () {
        var w = $(window).width();
        if (w > 768 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });


    /**
     * E-mail Ajax Send
     **/
    $('.form__popup').submit(function () {
        var th = $(this);
        afterTxt = $(th).find('.success');
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: th.serialize()
        }).done(function () {
            $(afterTxt).addClass('form__success_visible');
            setTimeout(function () {
                th.trigger('reset');
                $(afterTxt).removeClass('form__success_visible');
                $.magnificPopup.close();
            }, 3000);
        });
        return false;
    });


    /**
     * Определение формы с которой отправили
     **/
    $('a[href="#callback"]').click(function () {
        var dataForm = $(this).data('form'),
            dataText = $(this).data('text');
        $('.form__title').text(dataText);
        $('.popup-form [name=admin-data]').val(dataForm);
    });


    /**
     * Magnific
     **/
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

});

$(window).load(function () {
    $('.loader-inner').fadeOut();
    $('.loader').delay(400).fadeOut('slow');
});
