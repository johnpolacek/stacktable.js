/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
 */
;(function($) {
  "use strict";

  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {id:'stacktable small-only',hideOriginal:true,headIndex:0},
        settings = $.extend({}, defaults, options);

    // checking the "headIndex" option presence... or defaults it to 0
    var headIndex = options && options.headIndex ? options.headIndex : 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }

      var table_css = $table.prop('class');
      var $stacktable = $('<div>');
      if (typeof settings.myClass !== undefined) {
        $stacktable.addClass(settings.myClass);
      }
      var markup = '';

      
      $table.addClass('stacktable large-only');
      var $caption = $table.find("caption").clone();
      var $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tbody tr').each(function(rowIndex,value) {
        var row = $(this);

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        var headMarkup = '';
        var bodyMarkup = '';
        var row_class = row.prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        row.find('td,th').each(function(cellIndex,value) {
          var col = $(this);

          if (col.html() !== '') {
            bodyMarkup += [
              '<tr class="' + row_class + '">',
                '<td class="st-key">',
                  $topRow.find('td,th').eq(cellIndex).html() ? $table.find('thead th').eq(cellIndex).html() : '',
                '</td>',
                '<td class="st-val ' + col.prop('class') + '">',
                  col.html(),
                '</td>',
              '</tr>'
            ].join('\n');
          }
        });

        markup += [
          '<table>',
            '<tbody>' + headMarkup + bodyMarkup + '</tbody>',
          '</table>'
        ].join('\n');
      });

      $table.find('tfoot tr td').each(function(rowIndex,value) {
        if ($.trim($(value).text()) != "") {
          markup += [
            '<table>',
              '<tbody><tr><td>' + $(value).html() + '</td><tr></tbody>',
            '</table>'
          ].join('\n');
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup).addClass(table_css + ' ' + settings.id));
      $table.before($stacktable);
      if (!settings.hideOriginal) {
        $table.show();
      }
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {id:'stacktable small-only',hideOriginal:true,headIndex:0},
        settings = $.extend({}, defaults, options);

    // checking the "headIndex" option presence... or defaults it to 0
    var headIndex = options && options.headIndex ? options.headIndex : 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table>').addClass(table_css + ' ' +settings.id);
      if (typeof settings.myClass !== undefined) {
        $stacktable.addClass(settings.myClass);
      }
      var markup = '';

      var $table = $(this);
      $table.addClass('stacktable large-only');
      var $caption = $table.find("caption").clone();
      var $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tr').each(function(rowIndex,value) {
        var row = $(this);

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        var headMarkup = '';
        var bodyMarkup = '';
        var row_class = row.prop('class');
        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          markup += [
            '<tr class="' + row_class + '">',
              '<th class="st-head-row st-head-row-main" colspan="2">',
                row.find('th,td').eq(headIndex).html(),
              '</th>',
            '</tr>'
          ].join('\n');
        } else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          row.find('td,th').each(function(cellIndex,value) {
            var col = $(this);

            if (cellIndex === headIndex) {
              headMarkup = [
                '<tr class="' + row_class + '">',
                  '<th class="st-head-row" colspan="2">',
                    col.html(),
                  '</th>',
                '</tr>'
              ].join('\n');
            } else {
              if (col.html() !== ''){
                bodyMarkup += [
                  '<tr class="' + row_class +'">',
                    '<td class="st-key">',
                      $topRow.find('td,th').eq(cellIndex).html() ? $topRow.find('td,th').eq(cellIndex).html() : '',
                    '</td>',
                    '<td class="st-val ' + col.prop('class') + '">',
                      col.html(),
                    '</td>',
                  '</tr>'
                ].join('\n');
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
      if (!settings.hideOriginal) $table.show();
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {id:'stacktable small-only',hideOriginal:true},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      // first table <tr> must not contain colspans, or add sum(colspan-1) here.
      var num_cols = $table.find('tr').eq(0).find('td,th').length;
      // stackcolumns has no effect on tables with less than 3 columns
      if(num_cols < 3) {
        return;
      }

      var $stackcolumns = $('<table>').addClass(settings.id);
      if (typeof settings.myClass !== undefined) $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var col_i = 1; //col index starts at 0 -> start copy at second column.
      
      while (col_i < num_cols) {
        $table.find('tr').each(function(index,value) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) {
            tem.addClass("st-head-row st-head-row-main");
          }
          var first = $(this).find('td,th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('td,th').each(function(index,value) {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) { //out of current bounds
                    target += i + cs - col_i -1;
                  }
                  i += cs;
                } else {
                  i++;
                }

                if (i > col_i) {
                  return false; //target is set; break.
                }
            });
          }
          var second = $(this).find('td,th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          $stackcolumns.append(tem);
        });
        ++col_i;
      }

      $table.before($stackcolumns);
      if (!(settings.hideOriginal)) {
        $table.show();
      }
    });
  };

  $(function ($) {
    $('.cardtable-init').cardtable();
    $('.stacktable-init').stacktable();
    $('.stackcolumns-init').stackcolumns();
  });

}(jQuery));
