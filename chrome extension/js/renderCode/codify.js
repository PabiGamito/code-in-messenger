// NOTE: Always bundle this code with: browserify codify.js -o bundle.js 
var lang = require('language-classifier');

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
        var language = match[1];
        var codeStr = match[2];
        formatCode(codeStr,language);
      } else if (text.includes("{") || 
          text.includes(";\n") || 
          text.includes("()") || 
          text.includes("//") ||
          text.includes("/*") ||
          text.includes("&&") ||
          text.includes("||") ||
          text.includes("!==") ||
          text.includes("==") ||
          text.includes(":")) {
        // Semi-colons at the end of a line. This alone would catch a whole bunch of languages.
        // Parentheses directly following text with no space to separate it: myFunc()
        // A dot or arrow between two words: foo.bar = ptr->val
        // Presence of curly braces, brackets: while (true) { bar[i]; }
        // Presence of "comment" syntax (/*, //, etc):
        // Uncommon characters/operators: +, *, &, &&, |, ||, <, >, ==, !=, >=, <=, >>, <<, ::, __
        // Run your syntax highlighter on the text. If it ends up highlighting some high percentage of it, it's probably code.
        // camelCase text in the post.
        // nested parentheses, braces, and/or brackets.
        language = lang(text);
        formatCode(messengerText,language);
      }
    }
    msgCount = messengerBubbles.length;
  }

  function formatCode(codeStr, language) {
    messengerBubble.parentNode.style.padding = "0";
    messengerBubble.parentNode.style.borderRadius = "25px";
    messengerBubble.innerHTML = '';
    var pre = document.createElement('pre');
    pre.className = "prettyprint prettyprinted";
    pre.style.padding = "10px";
    pre.style.borderRadius = "25px";
    var formattedCode = PR.prettyPrintOne(codeStr, language, true);
    pre.innerHTML = formattedCode;

    messengerBubble.appendChild(pre);
  }

  replaceCode();
  replaceCode();

  $('#js_1').on('DOMSubtreeModified', function(e) {
    if (!(document.getElementsByClassName('_aok').length == msgCount)) {
      replaceCode();
    }
  });
});