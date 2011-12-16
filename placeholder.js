/**
 * placeholder.js
 *
 * @version v0.1
 * @author Mato Ilic info@matoilic.ch
 * @copyright 2011 Mato Ilic
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

;(function($, doc) {
    //skip if there is native browser support for the placeholder attribute
    if('placeholder' in doc.createElement('input')) return;
    
    /* patch jQuery.fn.val to return an empty value if the value matches 
     * the placeholder
     */
    $.fn.realVal = $.fn.val;
    $.fn.val = function() {
        var $element = $(this), val, placeholder;
        if(arguments.length > 0) return $element.realVal.apply(this, arguments);
        
        val = $element.realVal();
        placeHolder = $element.attr('placeholder');
        
        return ((val == placeHolder) ? '' : val);
    };
    
    jQuery(function($) {
       $('[placeholder]').focus(function() {
           var target = $(this);
       
           if(target.realVal() == target.attr('placeholder')) {
               target.realVal('');
               target.removeClass('placeholder');
           }
       }).blur(function() {
           var target = $(this);
           if($.trim(target.realVal()).length == 0) {
               target.realVal(target.attr('placeholder'));
               target.addClass('placeholder');
           }
       }).blur();
   
       $('form').submit(function() {
           $(this).find('[placeholder]').each(function() {
               var target = $(this);
               if(target.realVal() == target.attr('placeholder')) {
                   target.realVal('');
               }
           });
       }); 
    });
})(jQuery, document);