###
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
###
(($) ->
  $.fn.stacktable = (options) ->
    $tables = this
    defaults =
      id: "stacktable"
      hideOriginal: false

    settings = $.extend({}, defaults, options)
    stacktable = undefined
    $tables.each ->
      $stacktable = $("<table class=\"" + settings.id + "\"><tbody></tbody></table>")
      $stacktable.addClass settings.myClass  if typeof settings.myClass isnt `undefined`
      markup = ""
      $table = $(this)
      $topRow = $table.find("tr").eq(0)
      $table.find("tr").each (index, value) ->
        markup += "<tr>"

        # for the first row, top left table cell is the head of the table
        if index is 0
          markup += "<tr><th class=\"st-head-row st-head-row-main\" colspan=\"2\">" + $(this).find("th,td").eq(0).html() + "</th></tr>"

        # for the other rows, put the left table cell as the head for that row
        # then iterate through the key/values
        else
          $(this).find("td").each (index, value) ->
            if index is 0
              markup += "<tr><th class=\"st-head-row\" colspan=\"2\">" + $(this).html() + "</th></tr>"
            else
              if $(this).html() isnt ""
                markup += "<tr>"
                if $topRow.find("td,th").eq(index).html()
                  markup += "<td class=\"st-key\">" + $topRow.find("td,th").eq(index).html() + "</td>"
                else
                  markup += "<td class=\"st-key\"></td>"
                markup += "<td class=\"st-val\">" + $(this).html() + "</td>"
                markup += "</tr>"


      $stacktable.append $(markup)
      $table.before $stacktable
      $table.hide()  if settings.hideOriginal

) jQuery
