#!/usr/bin/env node

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

//bad comment -- needs a space after slashes
var test = "what";

if (test) {
  ["a","b","c"].forEach(function (x) { 
    console.log(x*2); 
  })
}

var obj = {val: 2}

;[1].forEach(function() {})

function f2 () {}
function   fooz() {}
function   foox () {}
function   foos   () {}

f2(obj)
fooz()
foox()
foos()

function foo(){}
function bar() {}
function quux()  {}


foo()
bar()
quux()


function food (){}
function foot ()  {}


food()
foot()



