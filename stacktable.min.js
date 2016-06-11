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
 * Requires jQuery version 1.7 or above
 *
 */
!function(t){t.fn.cardtable=function(a){var s,d=this,e={headIndex:0},l=t.extend({},e,a)
return s=a&&a.headIndex?a.headIndex:0,d.each(function(){var a=t(this)
if(!a.hasClass("stacktable")){var s=t(this).prop("class"),d=t("<div></div>")
"undefined"!=typeof l.myClass&&d.addClass(l.myClass)
var e,n,i,h,r,c=""
a.addClass("stacktable large-only"),e=a.find("caption").clone(),n=a.find("tr").eq(0),a.siblings().filter(".small-only").remove(),a.find("tbody tr").each(function(){i="",h="",r=t(this).prop("class"),t(this).find("td,th").each(function(a){""!==t(this).html()&&(h+='<tr class="'+r+'">',h+=n.find("td,th").eq(a).html()?'<td class="st-key">'+n.find("td,th").eq(a).html()+"</td>":'<td class="st-key"></td>',h+='<td class="st-val '+t(this).prop("class")+'">'+t(this).html()+"</td>",h+="</tr>")}),c+='<table class=" '+s+' stacktable small-only"><tbody>'+i+h+"</tbody></table>"}),a.find("tfoot tr td").each(function(a,d){""!==t.trim(t(d).text())&&(c+='<table class="'+s+' stacktable small-only"><tbody><tr><td>'+t(d).html()+"</td></tr></tbody></table>")}),d.prepend(e),d.append(t(c)),a.before(d)}})},t.fn.stacktable=function(a){var s,d=this,e={headIndex:0},l=t.extend({},e,a)
return s=a&&a.headIndex?a.headIndex:0,d.each(function(){var a=t(this).prop("class"),d=t('<table class="'+a+' stacktable small-only"><tbody></tbody></table>')
"undefined"!=typeof l.myClass&&d.addClass(l.myClass)
var e,n,i,h,r,c,o=""
e=t(this),e.addClass("stacktable large-only"),n=e.find("caption").clone(),i=e.find("tr").eq(0),e.find("tr").each(function(a){h="",r="",c=t(this).prop("class"),0===a?o+='<tr class=" '+c+' "><th class="st-head-row st-head-row-main" colspan="2">'+t(this).find("th,td").eq(s).html()+"</th></tr>":(t(this).find("td,th").each(function(a){a===s?h='<tr class="'+c+'"><th class="st-head-row" colspan="2">'+t(this).html()+"</th></tr>":""!==t(this).html()&&(r+='<tr class="'+c+'">',r+=i.find("td,th").eq(a).html()?'<td class="st-key">'+i.find("td,th").eq(a).html()+"</td>":'<td class="st-key"></td>',r+='<td class="st-val '+t(this).prop("class")+'">'+t(this).html()+"</td>",r+="</tr>")}),o+=h+r)}),d.prepend(n),d.append(t(o)),e.before(d)})},t.fn.stackcolumns=function(a){var s=this,d={},e=t.extend({},d,a)
return s.each(function(){var a=t(this),s=a.find("tr").eq(0).find("td,th").length
if(!(3>s)){var d=t('<table class="stacktable small-only"></table>')
"undefined"!=typeof e.myClass&&d.addClass(e.myClass),a.addClass("stacktable large-only")
for(var l=t("<tbody></tbody>"),n=1;s>n;)a.find("tr").each(function(a){var s=t("<tr></tr>")
0===a&&s.addClass("st-head-row st-head-row-main")
var d=t(this).find("td,th").eq(0).clone().addClass("st-key"),e=n
if(t(this).find("*[colspan]").length){var i=0
t(this).find("td,th").each(function(){var a=t(this).attr("colspan")
return a?(a=parseInt(a,10),e-=a-1,i+a>n&&(e+=i+a-n-1),i+=a):i++,i>n?!1:void 0})}var h=t(this).find("td,th").eq(e).clone().addClass("st-val").removeAttr("colspan")
s.append(d,h),l.append(s)}),++n
d.append(t(l)),a.before(d)}})}}(jQuery)
