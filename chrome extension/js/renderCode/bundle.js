(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
$(document).ready(function() {
  var msgCount = 0
  var codeRegexPattern = /\[([a-z]*)\]((.|\n)*)\[\/([a-z]*)\]/g;

  function replaceCode() {
    var messengerBubbles = document.getElementsByClassName('_aok');
    var j = messengerBubbles.length-1;
    for (var i = j; i >= 0; --i) {
      var messengerBubble = messengerBubbles[i];
      var messengerText = messengerBubble.firstChild.innerHTML
      var match = codeRegexPattern.exec(messengerText);
      if (match != null) {
        messengerBubble.parentNode.style.padding = "0";
        messengerBubble.parentNode.style.borderRadius = "25px";
        messengerBubble.innerHTML = '';
        var language = match[1];
        var codeStr = match[2];

        var pre = document.createElement('pre');
        pre.className = "prettyprint prettyprinted";
        pre.style.padding = "10px";
        pre.style.borderRadius = "25px";
        var formattedCode = PR.prettyPrintOne(codeStr, language, true);
        pre.innerHTML = formattedCode;

        messengerBubble.appendChild(pre);
      }
    }
    msgCount = messengerBubbles.length;
  }

  replaceCode();
  replaceCode();

  $('#js_1').on('DOMSubtreeModified', function(e) {
    if (!(document.getElementsByClassName('_aok').length == msgCount)) {
      replaceCode();
    }
  });
});
},{}]},{},[1]);
