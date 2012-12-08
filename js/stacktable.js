/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * The jQuery plugin for stacking tables for small screens in Responsive Web Design
 *
 */
console.log('wtf');
;(function($) {

  $.fn.stacktable = function(options) {
    var $table = this,
        $stacktable = $('<table></table>'),
        reset       = false,
        equalize,
        type;

    if (!$.isFunction($.fn[stacktable])) { return false; }

    return $table.each(function() {
      $(this).find('tr').first().find('td,th')(function() {
        $stacktable.append($('<tr>'+$(this).html()+'</tr>'));
      });
      $(this).before($stacktable);
      // var $children = $(this).children(),
      //     max = 0; // reset for each container

      // $children.each(function() {
      //   var $element = $(this),
      //       value;
      //   if (reset) { $element.css(type, ''); } // remove existing height/width dimension
      //   value = $element[equalize]();          // call height(), outerHeight(), etc.
      //   if (value > max) { max = value; }      // update max
      // });

      // $children.css(type, max +'px'); // add CSS to children
    });
  };
}(jQuery));
