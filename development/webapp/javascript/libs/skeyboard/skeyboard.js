$(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;
    
    $('.skeyboard li').click(function(){
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
        
        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();
            
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
        
        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
        
        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();
        
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');
            
            shift = false;
        }
        
        // Add the character
        if(character == '&amp;'){ character='&'; }
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

$(document).mouseup(function (event) {
    var container = $("#container");

    if (!container.is(event.target)  && container.has(event.target).length === 0) {
        $('.skeyboard').addClass('hide').fadeOut('fast');
    }
});