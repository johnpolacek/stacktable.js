/*
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
*/


(function() {
  (function($) {
    return $.fn.stacktable = function(options) {
      var $tables, defaults, settings, stacktable;

      $tables = this;
      defaults = {
        id: "stacktable",
        hideOriginal: false
      };
      settings = $.extend({}, defaults, options);
      stacktable = void 0;
      return $tables.each(function() {
        var $stacktable, $table, $topRow, markup;

        $stacktable = $("<table class=\"" + settings.id + "\"><tbody></tbody></table>");
        if (typeof settings.myClass !== undefined) {
          $stacktable.addClass(settings.myClass);
        }
        markup = "";
        $table = $(this);
        $topRow = $table.find("tr").eq(0);
        $table.find("tr").each(function(index, value) {
          markup += "<tr>";
          if (index === 0) {
            return markup += "<tr><th class=\"st-head-row st-head-row-main\" colspan=\"2\">" + $(this).find("th,td").eq(0).html() + "</th></tr>";
          } else {
            return $(this).find("td").each(function(index, value) {
              if (index === 0) {
                return markup += "<tr><th class=\"st-head-row\" colspan=\"2\">" + $(this).html() + "</th></tr>";
              } else {
                if ($(this).html() !== "") {
                  markup += "<tr>";
                  if ($topRow.find("td,th").eq(index).html()) {
                    markup += "<td class=\"st-key\">" + $topRow.find("td,th").eq(index).html() + "</td>";
                  } else {
                    markup += "<td class=\"st-key\"></td>";
                  }
                  markup += "<td class=\"st-val\">" + $(this).html() + "</td>";
                  return markup += "</tr>";
                }
              }
            });
          }
        });
        $stacktable.append($(markup));
        $table.before($stacktable);
        if (settings.hideOriginal) {
          return $table.hide();
        }
      });
    };
  })(jQuery);

}).call(this);
