$(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;
    


    $(document).on('click', '#help', function(){ // USE .ON INSTEAD OF .CLICK
        var character = $(this).html(); 
        $('#write').val($('#write').val() + character);
    });

    // IMPORTANT !!
    // Use .on instead of .click for dinamically genarated content
    $('.skeyboard li').on('click', function(){
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
        
        // Shift keys
        if ($this.hasClass('shift')) {
            $('.letter').toggleClass('uppercase');
            $('.letters .symbol span').toggleClass('on');
            
            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }
        
        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }
        
        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.val();
            
            $write.val(html.substr(0, html.length - 1));
            return false;
        }
        
        // Clean
        if ($this.hasClass('clean')) {            
            $write.val('');
            return false;
        }
        
        // Char
        if ($this.hasClass('chars')) {            
            $('.symbols').slideToggle();
            return false;
        }
        
        // Special characters
        if ($this.hasClass('symbol')) character = $('span.on', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
        
        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();
        
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.letters .symbol span').toggleClass('on');
            if (capslock === false) $('.letter').toggleClass('uppercase');
            
            shift = false;
        }
        
        // Add the character
        if(character == '&amp;'){ character='&'; }
        if(character == '&lt;'){ character='<'; }
        if(character == '&gt;'){ character='>'; }
        $write.val($write.val() + character);
        $write.focus();
    });
    
    $('#write').keypress(function(){
        return false;
    });
});

$('#write').on('focus', function() {
    $('.skeyboard').fadeIn( function() {
        $(this).removeClass('hide');
    });
});

// Nuevo

function toggleNumbers () {
    $('.skeyboard .numbers').find('span').toggle();
}

$('.skeyboard .numbers, .skeyboard .letters').hover( 
    function () {
        toggleNumbers();
    },
    function () {
        toggleNumbers();
    }
);

$('.button').click(function(event) {
    toggleNumbers();
});

// Fin Nuevo

$(document).mouseup(function(event) {
    var container = $("#container");

    if (!container.is(event.target)  && container.has(event.target).length === 0) {
        $('.skeyboard').addClass('hide').fadeOut('fast');
    }
});

$( document ).ready(function() {
    $('.skeyboard .symbols').append('<li id="help"></li>');
    $('.skeyboard .symbols #help').html('8');

    var myArray = [1,2,3,4,5,6,7,8,9,0];
    Shuffle(myArray);

    function Shuffle(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    for (var i=0;i<myArray.length;i++) {
        $(".skeyboard .numbers li span.on.n" + i).html(myArray[i]);
   }

    $('#write').bind('copy paste cut drag drop keyup', function (event) {  // NUEVO
       event.preventDefault();
    });

    $('#write').on('keydown', function (event) {  // NUEVO
        if (event.keyCode == 8 || event.keyCode == 46) {
            return false;
        }
    });
});