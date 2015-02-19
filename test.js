
// This file is automatically ran through standard-format
// and checked by standard. Add test cases for the formatter by adding
// to this file

// eol semicolons
var x = 1;

// eol whitespace
x = 2 

// standard-format has nothing to say about unused vars
// so this is here to prevent invalid test cases
console.log(x)

// sol semicolons and parens spacing
(function() {})()
(function () {})()
(function  () {})()

//bad comment -- needs a space after slashes
var test = "what";

if (true) {
  ["a","b","c"].forEach(function (x) { console.log(x*2); })
}

(function f2 () {})()
(function   fooz() {})()
(function   foox () {})()
(function   foos   () {})()


(function(){})()
(function (){})()
(function () {})()
(function ()  {})()


(function(){})()
(function foo(){})()
(function bar() {})()
(function quux()  {})()


(function(){})()
(function food (){})()
(function foot ()  {})()
