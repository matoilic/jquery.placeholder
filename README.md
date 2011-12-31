# jquery.placeholder #

jquery.placeholder is a small [jQuery](http://jquery.com)-based pollyfill for the HTML5 placeholder attribute.

## Usage ##

Just include the script and it takes care of everything. It also patches jQuery's `$.fn.val` function to return an empty value if the actual value matches the placeholder. If you add form fields dynamically to your form just call the `placeholder` function on your element, e.g. `$('input').placeholder()`, to initialize the plugin.

## Version History ##

**0.1**

* initial release

**0.1.1**

* define an empty `$.fn.placeholder` function if native browser support is available

**0.2**

* improved handling of password fields

**0.2.1**

* it doesn't drop and recreate password fields so that long time references don't break

## Licence ##

Copyright &copy; 2012 Mato Ilic <<info@matoilic.ch>>

jquery.placeholder is dual licensed under the MIT and GPL licenses:

* http://www.opensource.org/licenses/mit-license.php 
* http://www.gnu.org/licenses/gpl.html