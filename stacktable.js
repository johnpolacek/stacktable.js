/**
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
;(function($) {
  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {id:'stacktable small-only',hideOriginal:true,headIndex:0},
        settings = $.extend({}, defaults, options);

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class=" '+ table_css +' '+settings.id+'"><tbody></tbody></table>');
      if (typeof settings.myClass !== undefined) $stacktable.addClass(settings.myClass);
      var markup = '';

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find("caption").clone();
      $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tr').each(function(rowIndex,value) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').eq(headIndex).html()+'</th></tr>';
        }
        else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('td,th').each(function(cellIndex,value) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
            } else {
              if ($(this).html() !== ''){
                bodyMarkup += '<tr class="' + tr_class +'">';
                if ($topRow.find('td,th').eq(cellIndex).html()){
                  bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                bodyMarkup += '</tr>';
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
      $table = $(this);
      var num_cols = $table.find('tr').eq(0).find('td,th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="'+settings.id+'"></table>');
      if (typeof settings.myClass !== undefined) $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.
      
      while (col_i < num_cols) {
        $table.find('tr').each(function(index,value) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          first = $(this).find('td,th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('td,th').each(function(index,value) {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                }
                else
                  i++;

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          second = $(this).find('td,th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $table.before($stackcolumns);
      if (!(settings.hideOriginal)) {
        $table.show();
      }
    });
  };

}(jQuery));