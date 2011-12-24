/**
 * jquery.placeholder https://github.com/matoilic/jquery.placeholder
 *
 * @version v0.1.1
 * @author Mato Ilic <info@matoilic.ch>
 * @copyright 2011 Mato Ilic
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
;(function($, doc, debug) {
    var selector = ':input[placeholder]';
    
    //skip if there is native browser support for the placeholder attribute
    if(!debug && ('placeholder' in doc.createElement('input'))) {
        $.fn.placeholder = function() {};
        return;
    }
    
    /* patch jQuery.fn.val to return an empty value if the value matches 
     * the placeholder
     */
    $.fn.realVal = $.fn.val;
    $.fn.val = function() {
        var $element = $(this), val, placeholder;
        if(arguments.length > 0) return $element.realVal.apply(this, arguments);
        
        val = $element.realVal();
        placeholder = $element.attr('placeholder');
        
        return ((val == placeholder) ? '' : val);
    };
    
    function onBlur() {
        var target = $(this);
        if($.trim(target.realVal()).length == 0) {
            target.realVal(target.attr('placeholder'));
            target.addClass('placeholder');
        }
    }
    
    function onFocus() {
        var target = $(this);
        if(target.realVal() == target.attr('placeholder')) {
            target.realVal('');
            target.removeClass('placeholder');
        }
    }
    
    function onSubmit() {
        $(this).find(selector).each(function() {
            var target = $(this);
            if(target.realVal() == target.attr('placeholder')) {
                target.realVal('');
            }
        });
    }
    
    $.fn.placeholder = function() {
        this.blur();
    };
    
    jQuery(function($) {
        var $doc = $(doc);
        $doc.delegate('form', 'submit', onSubmit);
        $doc.delegate(selector, 'focus', onFocus);
        $doc.delegate(selector, 'blur', onBlur);
        $(selector).placeholder();
    });
})(jQuery, document, window.debug);
