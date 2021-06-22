/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * MIT license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');

      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr,>tr').eq(0);

      // avoid duplication when paginating
      $table.siblings().filter('.small-only').remove();

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr').each(function() {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        var $new_table = $('<table class="stacktable small-only"><tbody></tbody></table>').addClass(table_css);

        // for the first row, "cellIndex" cell is the head of the table
        // for the other rows, put the "cellIndex" cell as the head for that row
        // then iterate through the key/values

        $(this).find('>td,>th').each(function(cellIndex, cellElement) {
          if ($(cellElement).html() !== '') {
            $new_table.find('tbody').append(
              $('<tr/>').addClass(tr_class).append(
                $('<td class="st-key"/>').append(
                  $topRow.find('>td,>th').eq(cellIndex).contents().clone()
                ),
                $('<td class="st-val"/>').addClass($(cellElement).prop('class')).append($(cellElement).contents().clone())
              )
            )
          }
        });

        $stacktable.append($new_table);

      });

      $table.find('>tfoot>tr>td').each(function(cellIndex,cellElement) {
        if ($.trim($(cellElement).text()) !== '') {
          $stacktable.append(
            $('<table class="stacktable small-only"><tbody><tr><td></td></tr></tbody></table>')
              .addClass(table_css).find('td').append( $(cellElement).contents().clone() )).end();
        }
      });

      $stacktable.prepend($caption);
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {headIndex:0,displayHeader:true},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="stacktable small-only"><tbody></tbody></table>').addClass(table_css);
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class, displayHeader;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find(">caption").clone();
      $topRow = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0);

      displayHeader = $table.data('display-header') === undefined ? settings.displayHeader : $table.data('display-header');

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('>tbody>tr, >thead>tr').each(function(rowIndex, rowElement) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');

        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          if (displayHeader) {
            $stacktable.find('tbody').append(
              $('<tr/>').append(
                $('<th class="st-head-row st-head-row-main" colspan="2"></th>')
                .append($(rowElement).find('>th,>td').eq(headIndex).contents().clone())
              )
            );
          }
        } else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(rowElement).find('>td,>th').each(function(cellIndex, cellElement) {
            if (cellIndex === headIndex) {
              $stacktable.find('tbody').append(
                $('<tr><th class="st-head-row" colspan="2"></th></tr>').addClass(tr_class)
                .find('th').append($(cellElement).contents().clone()).end()
              );
            } else {
              if ($(cellElement).html() !== '') {
                $stacktable.find('tbody').append(
                  $('<tr></tr>').addClass(tr_class)
                    .append( $('<td class="st-key"></td>').append($topRow.find('>td,>th').eq(cellIndex).contents().clone()) )
                    .append( $('<td class="st-val"></td>').addClass( $(cellElement).prop('class') ).append($(cellElement).contents().clone()) )
                );
              }
            }
          });

        }
      });

      $stacktable.prepend($caption);
      $table.before($stacktable);
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      var $caption = $table.find(">caption").clone();
      var num_cols = $table.find('>thead>tr,>tbody>tr,>tfoot>tr').eq(0).find('>td,>th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('>thead>tr,>tbody>tr,>tfoot>tr').each(function(index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('>td,>th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('>td,>th').each(function() {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                } else {
                  i++;
                }

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          var second = $(this).find('>td,>th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $stackcolumns.prepend($caption);
      $table.before($stackcolumns);
    });
  };

}(jQuery));
