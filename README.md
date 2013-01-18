# jquery.placeholder #

jquery.placeholder is a small [jQuery](http://jquery.com)-based pollyfill for the HTML5 placeholder attribute.

## Usage ##

Just include the script and it takes care of everything. It also patches jQuery's `$.fn.val` function to return an empty value if the actual value matches the placeholder. If you add form fields dynamically to your form just call the `placeholder` function on your element, e.g. `$('input').placeholder()`, to initialize the plugin. The script adds a `placeholder` class to each element that contains a placeholder so you can style it properly.

`$.placeholder.input` and `$.placeholder.textarea` inidcate if the browser has native placeholder support for the two elements.

Demo: http://matoilic.github.com/jquery.placeholder

## Browser support ##

It supports all browsers that do not have native support for the placeholder attribute. Or at least I have not found one where it does not work :).

## Version History ##

**0.1**

* initial release

**0.1.1**

* define an empty `$.fn.placeholder` function if native browser support is available

**0.2**

* improved handling of password fields

**0.2.1**

* it doesn't drop and recreate password fields so that long time references don't break

**0.2.2**

* fixes IE6 support
* `$.placeholder.input` and `$.placeholder.textarea` to inidcate if the browser has native placeholder support for the two elements

**0.2.3**

* fixes `$.placeholder.input` and `$.placeholder.textarea`

**0.2.4**

* jQuery 1.9 compatibility

## Licence ##

Copyright &copy; 2013 Mato Ilic <<info@matoilic.ch>>

jquery.placeholder is dual licensed under the MIT and GPL licenses:

* http://www.opensource.org/licenses/mit-license.php 
* http://www.gnu.org/licenses/gpl.html