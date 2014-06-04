    function getTagName(elem) {
        var inputTag = $(elem).get(0).tagName.toLowerCase();
        
        if (inputTag != 'select') {inputTag = $(elem).prop('type')}
        if (inputTag == 'select') {inputTag = 'select'}
        if ($(elem).prop('multiple')) {inputTag = 'multiple'}

        return inputTag;
    }
    
    function insert_addon(elem) {
        var insertAddon = false;
        var elemType = getTagName(elem);

        if ($.inArray(elemType,['select', 'file', 'radio', 'checkbox']) > -1) {insertAddon = true}
        if ($.inArray(elemType,['radio', 'checkbox']) > -1) {elemType = 'option input ' + elemType}
        if (elemType == 'file') {elemType = elemType + ' input'}
        if (insertAddon == true) {$(elem).before('<div class="' + elemType + ' addon"></div>')}
        
        $(elem).parent('label').addClass('uform');
        $(elem).focus(function() {$(elem).parent('label').find('.addon').addClass('focus');});
        $(elem).blur(function()  {$(elem).parent('label').find('.addon').removeClass('focus');});
        $(elem).on('keyup', elem, function() {$(this).blur(); $(this).focus();}); // prevent double keypress events in ff (tinyurl.com/cx98jj)
        $(elem).on('change click keydown', elem, function() {update_field(this)});
    }

    function update_field(elem) {
        var elemText = '';
        var elemType = getTagName(elem);
        var addon = $(elem).prev('.addon');

        if (elemType == 'select') {elemText = $(elem).find(':selected').text()}
        if (elemType == 'file')   {elemText = $(elem).val().replace(/(c:\\)*fakepath\\/i, '')}
        addon.text(elemText);
        
        if ($(elem).prop('disabled')) {addon.addClass('disabled')} else {addon.removeClass('disabled')}
        if ($(elem).prop('readonly')) {addon.addClass('readonly')} else {addon.removeClass('readonly')}
        if ($(elem).prop('checked'))  {addon.addClass('checked')}  else {addon.removeClass('checked')}

        if ($(elem).hasClass('error'))   {addon.addClass('error')}   else {addon.removeClass('error')}
        if ($(elem).hasClass('warning')) {addon.addClass('warning')} else {addon.removeClass('warning')}
        if ($(elem).hasClass('success')) {addon.addClass('success')} else {addon.removeClass('success')}
        if ($(elem).hasClass('info'))    {addon.addClass('info')}    else {addon.removeClass('info')}

        if (elemType == 'radio'){
            $('input[type="radio"]').each(function() {                 
                if (!$(this).prop('checked')) {$(this).prev('.addon').removeClass('checked')}
            });
        }
    }

    function init_form() {
        $('input, select').each(function() { 
            var thisParent = $(this).parent('label').hasClass('uform');

            if (!thisParent) {insert_addon(this)}

            update_field(this);
        });
    }

    init_form();