/*======================================================== scripts  */

//  Table Rows
   
    function alternate_rows() {
        $('tr:nth-child(odd), option:nth-child(odd)').addClass('odd');
    };

    alternate_rows();

//  Show Popup
   
    $('.m-user-options .options').click(function(event){
        $(this).toggleClass('show');
        
        event.stopPropagation();
    });

    $('html').click(function(event){
        $('.m-user-options .options').removeClass('show');
    });

//  Offside Canvas
    
    $('.js-navbar').click(function(event) {
        $('html').toggleClass('js-toggle');
        return false;
    });

    $('header, main, footer').click(function() {
        $('html').removeClass('js-toggle');
    });

//  Close Button
    
    function add_close() {
        $('.js-close').append('<button class="button close">Close</button>');
    };
    
    function close_button() {
        $(".button.close").click(function() {
           $(this).parent().hide();
        });
    };

    add_close();
    close_button();

//  Sticky Footer

    function stickyFooter() {
        var windHeight  = $(window).height();
        var mainHeight  = $('main').height();
        var footHeight  = $('footer').height();
        var mainTop     = $('main').offset().top;
        var mainsHeight = $('main > section').height();
        var bodyHeight  = mainsHeight + mainTop + footHeight;
        var newmHeight  = windHeight - mainTop - footHeight;

        if (windHeight >= bodyHeight) {
            $("main section").css("min-height", newmHeight + "px");
        }
    }

    stickyFooter();

    $(window).resize(stickyFooter);
    $(window).on('scroll', function () {
        stickyFooter();
    });