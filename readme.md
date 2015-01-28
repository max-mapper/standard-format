# standard-format

**experimental** auto formatter for the easier cases in [standard](https://www.npmjs.com/package/standard)

[![NPM](https://nodei.co/npm/standard-format.png)](https://nodei.co/npm/standard-format/)

## try it out

```
$ npm install standard-format -g
$ standard-format
```

currently converts this:

```js
function() {}
function () {}
function  () {}


function f() {}
function f () {}
function   foo() {}
function   foo () {}
function   foo   () {}


function(){}
function (){}
function () {}
function ()  {}


function(){}
function foo(){}
function foo() {}
function foo()  {}


function(){}
function foo (){}
function foo ()  {}
```

into this:

```js
function () {}
function () {}
function () {}
function f () {}
function f () {}
function foo () {}
function foo () {}
function foo () {}

function () {}
function () {}
function () {}
function () {}

function () {}
function foo () {}
function foo () {}
function foo () {}

function () {}
function foo () {}
function foo () {}
```
