/**
 * jquery.placeholder https://github.com/matoilic/jquery.placeholder
 *
 * @version v0.2.1
 * @author Mato Ilic <info@matoilic.ch>
 * @copyright 2012 Mato Ilic
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
;(function($, doc, debug) {
    var selector = ':input[placeholder]';
    
    //skip if there is native browser support for the placeholder attribute
    if(!debug && ('placeholder' in doc.createElement('input')) && ('placeholder' in doc.createElement('textarea'))) {
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
        var $target = $(this), $clone, plceholder, hasVal, cid;
        placeholder = $target.attr('placeholder');

        if($.trim($target.val()).length > 0) return;
        
        if($target.is(':password')) {
            cid = $target.attr('id') + '-clone';
            
            $clone = $target.clone()
                            .attr({type: 'text', value: placeholder, 'data-password': 1, id: cid})
                            .addClass('placeholder');
                            
            $target.before($clone).hide();
            $('label[for=' + $target.attr('id') + ']').attr('for', cid);
        } else {
            $target.val(placeholder);
            $target.addClass('placeholder');
        }
    }
    
    function onFocus() {
        var $target = $(this), $clone, $orig;
        
        if($target.is(':password')) return;
        
        if($target.data('password')) {
            $orig = $target.next().show().focus();
            $('label[for=' + $target.attr('id') + ']').attr('for', $orig.attr('id'));
            $target.remove();
        } else if($target.realVal() == $target.attr('placeholder')) {
            $target.val('');
            $target.removeClass('placeholder');
        }
    }
    
    function onSubmit() {
        $(this).find(selector).each(function() {
            var $target = $(this);
            if($target.realVal() == $target.attr('placeholder')) {
                $target.val('');
            }
        });
    }
    
    $.fn.placeholder = function() {
        return this.blur();
    };
    
    $(function($) {
        var $doc = $(doc);
        $doc.delegate('form', 'submit', onSubmit);
        $doc.delegate(selector, 'focus', onFocus);
        $doc.delegate(selector, 'blur', onBlur);
        $(selector).placeholder();
    });
})(jQuery, document, window.debug);
