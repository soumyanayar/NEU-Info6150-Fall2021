# Javascript Overview

This assumes you are familiar with a C-like language (C, C++, C#, Java, Perl, Python, Ruby, etc).  This is a fast and high-level overview and will skip many details.

## Language Fundamentals 

### Interpretation

JS is an interpreted language, not compiled.  Often there is a compile-like step to transform the text, but the end result is still Javascript that will be interpreted.

### Engines 

Because JS is interpreted, some program does the interpretation - the "JS Engine".  In a compiled language, once the code is compiled into a language, the exact behavior of the code is set.  With an interpreted language, the exact behavior is decided by the Engine.  In many cases, the engine is a browser, and this means each browser has a chance to interpret the JS code slightly differently.  While there is a defined standard for how the language should be interpreted, that standard regularly changes and each browser regularly changes how much of the standard they apply (and how accurate they are in doing so).  NodeJS is another engine, one that runs on a computer with no browser involved, and it adds I/O (networking and file system) options that browser-based JS doesn't include.  Other engines exist, but the browsers and NodeJS represent the vast majority of JS engines out there.

### JS Versions

The history of JS is a fascinating read (at least if you're a nerd like me), but the current state is that there is a defined standard (known as ECMAScript(ES) ) that gets updated every year.  The standard used to be numbered (ES3, ES5, ES6) but is now done by year (ES2016, ES2017, ES2018).  In between official versions, new features are proposed and tested, and browsers may add in support for changes that seem likely to become official before they actually are.  Other times browsers may lag behind actually implementing features that ARE already official.  

The standard is a guideline, but you cannot assume every browser implements the features.  A good way to check to see if a feature is supported in browsers is http://caniuse.com

## Syntax basics

Unlike languages like Java, JS code is NOT all contained within Objects.  Instead, the starting point is one or more statements.  (These may define and use objects, but there is no `main()` like in C nor `static void main()` like in Java)

Sample:
```
  console.log('this is a complete JS program');
```

A JS statement is either a line that ends in a semicolon, or a statement block that ends with curly braces `{ }` and NO semicolon.

```
  console.log('this statement will end in a semicolon');
  if( true ) { 
    console.log('the statement block will end in a } and will not end in a semicolon');
  }
```

Note that JS _can_ work without semicolons.  JS interpreters will try to figure out where a semicolon is.  This can be dangerous!  If you don't understand where the JS interpreter will act as if you have a semicolon, you can create bugs.  

While there are JS sub-communities that prefer to avoid semicolons (e.g. Vue ), most explicitly keep them.

FOR THIS CLASS YOU ARE REQUIRED TO USE SEMICOLONS

## Strict Mode

JS is remarkably backward compatible.  This is part of what keeps the web working - once JS code is correctly written, later changes will almost never break the code.  A website might be written with some JS years ago, and even if you are using a browser that has been updated dozens of times since the webpage still works.

Overall this is great, but it does make it hard to remove mistakes and bad decisions that were made long ago.  One way to handle this is "strict mode".  By default, JS will NOT run in strict mode.  This means all the bad behavior still works.  But if your code is set to run in strict mode, certain old default behaviors are changed.  Because you (the author of the code) are the one that decides if it runs in strict mode, you can make sure that you aren't relying on any of those bad behaviors in the code.  

FOR THIS CLASS YOUR CODE SHOULD ALWAYS WORK IN STRICT MODE

## Variables and Data types

JS variables should be declared before they are used.  (Outside of strict mode, JS will assume you are declaring a variable if you use a variable that wasn't declared.  In strict mode you must declare the variable.)

### Variable Names

Variable names are a mix of alpha-numeric characters and underscore (`_`).  Hyphens (`-`) are NOT allowed, and the first character cannot be a digit.  (`word1` is a valid variable name, but `1word` is not).  

The common convention for JS variables is camelCase, not MixedCase and not snake_case.  Two exceptions exist: constants (variables that represent understood unchanging values) are done in `UPPER_SNAKE_CASE`, and the names of classes or other instantiated items are in MixedCase.

FOR THIS CLASS YOUR VARIABLES MUST FOLLOW THE COMMON CONVENTIONS

If you are familiar with staticly-typed languages (such as Java, C#, etc), you may be wondering where we declare the type of a varaible.  We don't.  In dynamically-typed languages (such as Javascript, Python, etc) the type of a value is with the value, not with the variable.

There are three keywords to declare a variable:
1. `var`
2. `const`
3. `let`

#### var

`var myVariable;` - `var` used to be the only way to declare a variable, and you'll see it a lot in online guides and examples.  YOU SHOULD NOT USE IT.  Only use `var` if you cannot use newer options, and when we learn transpilers you'll see you can almost always use newer options.  
- `var` variables are function-scoped
- `var` variables can be assigned at declaration, or later
- `var` variables are "hoisted" - the interpreter is aware that it is declared in lines that are technically before the declaration.  YOU SHOULD NOT RELY ON HOISTING OF `var` VARIABLES

#### const
`const myVariable;` - NOTE: `const` is NOT used (only) for declaring constants.   `const` instead says that the __variable name__ will not be reassigned.  The value the variable holds can change (for example, an object or an array)
- FOR THIS CLASS, YOU SHOULD USE `const` UNLESS YOU ARE REASSIGNING THE VARIABLE NAME
- `const` variables are block-scoped
- Because you cannot reassign the variable name, `const` variables must be assigned a value at declaration
- `const` will be the vast majority of your variables

#### let
`let myVariable;` - `let` is similar to `var`, in that you can reassign the variable name.  When you can't use `const`, you should use `let`.
- `let` variables are block-scoped
- `let` variables have special treatment in a `for` loop to end up working as you would expect

### Basic Data Types

There are 8 basic data types in JS:
1. undefined
2. null (Yes, it's distinct from `undefined`)
3. boolean
4. Number
5. String
6. Array
7. Object
8. Function
9. Symbol

#### undefined and null

`undefined` and `null` both exist, and both indicate the lack of an actual value.

The difference is that `undefined` indicates an unintentional lack of value, while `null` indicates a deliberate lack of value.  

This is very subjective and hard to pin down.  As a rule of thumb, check for "undefined" but never assign it.  Likewise, if a value is undefined by default you don't need to reassign it to `null`, leave it as `undefined`.

Many values will be `undefined` by default, including variables that aren't assigned a value, object properties and array values that aren't defined, and core function calls that don't have a defined return value or that don't match.  (exception: if the function returns an array or object, it will return null there is no data to return)

#### Boolean

`true` and `false`.  (Note: all lowercase, not True or False as Python has it)
- "Truthy" and "Falsy" (interpreting non-boolean values as boolean) become important, more on that later

#### Number

JS Numbers are double precision floats by default.  This means they can store integers or decimal values.  

As with all languages, you have to be careful with decimal values.  0.1 + 0.2 does not equal 0.3, because binary representation is tricky.

#### String

JS Strings can be double quoted ("example") or single quoted ('example') or, as of ES6, backtick quoted (`example`).

The first two are treated identically - the only difference is that a double-quoted string can contain single quotes without escaping, and a single-quoted string can contain double quotes without escaping.  For this reason single quotes are preferred when you are dealing with HTML (where attributes are more often wrapped in double quotes) and double quotes are preferred when you are dealing with english or other human text (where a single quote is an apostrophe).

The latter case, the backticks, is a special case known as a "template literal".  You can use backticks to quote a string just fine (and it can contain both single- sand double-quote characters without escaping them), but you can also interpret other variables and place them in the text:

```
const name = "Preetha";
const greeting = `hello ${name}`;
```

you can put complex expressions inside the ${} construct...but you should keep it simple - direct variable references and minimal transformations only.

Template literals have additional complex uses (such as being a callable function) that I won't cover here.

Strings cannot be altered - all you can do is generate a new string.  

Note that the strings "null" and "undefined" are just strings - they are NOT the special values `null` or `undefined`.  (regardless of how you quote them, something the markdown format can make a little challenging to represent quickly).  The same with "true" and "false" - these are just strings, not boolean values.

#### Array

An array is an ordered list.  Values are referenced by a numerical index, starting at 0.  When you change the value at a given index of the array, the actual ARRAY itself hasn't changed, merely the values stored at it.

Arrays are created using square brackets ( [] ) and values are comma separated.  Trailing commas are permitted in modern JS.

Arrays can store values of different types (you rarely WANT to, but you can).

Array values are gotten by index by putting the index value in square brackets after the array value.

If you access an index that doesn't exist, you will get `undefined` as the value - NOT an error.  

Negative indexes do NOT come give you the value from the end of the array.  You will just get `undefined`.

Array length can be gotten via a .length property of the array.  (Yes, technically arrays are a specialized form of object)

```
const list = [ 1, 5, "Amit" ]; 
console.log(list[0]);  // 1
console.log(list[5]); // undefined
console.log(list[-1]); // undefined
list[1] = 4; // No error, despite `list` being `const`
console.log(list.length); // 3
```

- See Also: "rest parameters" on MDN
- See Also: "spread syntax" on MDN
- See Also: "destructuring assignment" on MDN

#### Object

Now things get tricky, particularly if you're coming from Java.  It is very easy to think you already know how this works, only to later get caught by a dramatic difference from something that has the same name as something you are familiar with.

A JS object is a dynamic collection of properties (some of which can be functions/methods, more on that later), indexed by a key that is a string.

A JS object is NOT defined by a class (a blueprint defining an object).  An object MIGHT be created using a class, but instead of defining what that object is, it merely defines the starting state and inheritance of the object.  And many, MANY objects are NOT created from classes.

The basic creation of an object is done using curly braces:
```
const someObject = {};
```

Key/value pairs during object creation can be denoted by separating them with a colon (`:`).  

Baretext (without quotes) will be converted to a string if it follows the same rules as JS variable names.  More complicated text for a key will have to be quoted.  Non-string values (such as numbers) will be converted to a string automatically.  (This is generally a bad idea, so don't do that).  

Multiple key/value pairs are separated by a comma (`,`).  Trailing commas are allowed in modern JS. 

While object keys must be strings, the values stored at an object key index can be anything (including another object).

```
const anotherObject = { 
  a: 1,
  b: [ 1,1,2,3,5,8],,
  'complex key': 3,
  'also-complex: "some text",
  weCanNest: { doingSo: "demonstrated" },
};
```

Retrieving values stored in an object can be done via "dot notation", where the key is given as a string following a "dot" (`.`):

```
const value = anotherObject.a; // 1
```

Complex keys can't be accessed this way, so you can also put a string value in square brackets:

```
const fromComplexKey = anotherObject['complex key'];
```

JS Objects can only store one value per key (property), so JS Object are often used as basic maps:

```
const uniqueLetters = {};
for( let letter of "banana" ) { 
  uniqueLetters[letter] = true;
}
console.log( uniqueLetters ); // { b: true, a: true, n: true }
console.log( Object.keys( uniqueLetters ) ); // 'b', 'a', 'n'
```

**Notice how new properties can just be defined as-needed, at any time.**

When objects are created, sometimes you want to add keys (properties) based on the values of other variables.  This is done by using square brackets around the _key_:
```
const propName = 'three';
const someObj = { 
  one: 1,
  two: 2,
  [propName]: 3
};
console.log(someObj); // { one: 1, two: 2, three: 3 }
```

In addition, there is a shorthand syntax for defining methods (object properties that hold functions as values):
```
const someObj = { 
  // Normal way of defining a method
  method1: function() { 
    console.log('method1');
  },

  // shorthand way of defining a method
  method2() { 
    console.log('method2');
  },
};
someObj.method1(); // 'method1'
someObj.method2(); // 'method2'
```

Often there will be cases where you are defining an object where the values or properties are coming from variables that have the same names as the properties.  You _could_ just define them that way, but it comes out a bit repetitive:
```
const name = 'Cat 5';
const type = 'cat';
const pet = { 
  name: name,
  type: type,
};
```

Instead, you can give just the key when defining an object, and it will pull in the value of the appropriate variable:
```
const name = 'Cat 5';
const type = 'cat';
const pet = { 
  name, 
  type,
};
```

These can be mixed:
```
const name = 'Cat 5';
const type = 'cat';
const pet = { 
  name, 
  species: type,
};
```

##### When to use an Object

A common mistake for new JS devs is to use an Array to store values when they really should use an object.  If you don't care about the order, and you find yourself looping through an array to find a given value, you should have used an object.

Anything that isn't an immutable (unchangeable) primitive value in JS (boolean, null, undefined, string) is technically an object as well.  This can be very confusing, when we contrast, for example, arrays and objects, since an array is technically an object.  However, we're almost always talking about the specialized abilities an array has, which a normal object does not.  

- See Also: "spread in object literals" on MDN
- See Also: "Object destructuring" on MDN

#### Function

Functions are so-called "first-class citizens" in JS.  This means they are treated just like any other value - they can be assigned to variables, stored in arrays and objects, and passed as parameters/arguments to functions.  This is a VERY powerful ability that shapes how JS is used at a fundamental level.

A function is an object, just like so many other values in JS - this means it can have (and does have!) properties and methods, in addition to being callable like a function in any other language.  A function that is a property of another object can be called a "method", but that is just a label - there is no difference between a "method" and a "function".  They are each callable objects that can be stored/passed as values.

Functions can be defined as statements using the "function" keyword.  Arguments can be listed inside parens ("()") following the function name, in which case those names will be considered variables within the function.  However, these arguments are NOT enforced - the function can be called with fewer or more arguments and no error will be thrown.  If not enough arguments are passed, any remaining parameters will be set to `undefined`.

There is no automatic type enforcement on values passed to functions.
```
function someFunc(first, second, bob, jane) { 
  console.log(first);
  console.log(second);
  console.log(bob);
  console.log(jane);
}

someFunc(1,2,3,4,5); // 1 2 3 4 ( the extra param is ignored)
someFunc(1,2); // 1 2 undefined undefined 
```
Undefined function parameters can be assigned defaults in the declaration, using the equals sign ( = ):
```
function someFunc( val=0 ) { 
  console.log(val);
}
someFunc(1); // 1
someFunc();  // 0
someFunc(undefined); // 0
someFunc(null); // null (null is NOT undefined)
```

An advanced technique is to use object structuring in your function declaration, and pass arguments as an object.  This effectively creates named parameters that are NOT dependent on order.  I RECOMMEND THIS TECHNIQUE FOR ANY FUNCTION THAT HAS MORE THAN 2 PARAMETERS (and it's not bad with 2 or less either)
```
function someFunc({ first, second }) { // Pulls the named keys out of the passed object
  console.log(first, second);
} 
someFunc({ first: 1, second: 3}); // 1 3
someFunc({ second: 2, first: 10 }); // 10 2
someFunc({ first: 1, second: 2, third: 5}); // 1 2 - extra param is ignored
```
This can be combined with defaulting the object values during destructuring assignment as well as defaulting the initial object, not to mention using the spread operator to help construct the passed object:
```
function someFunc({ name="World", greeting="Hello"}={}) { // default each param, default to an empty passed object
  console.log(`${greeting} ${name}`);
}

someFunc(); // Hello World
someFunc({ name: "Bereket" }); // Hello Bereket
someFunc({ greeting: "Hey" }); // Hey World
const class = [ { name: 'Jay'}, { name: 'Simone'}, { greeting: "My old friend", name: "James"}];
someFunc({ ...class[1] }); // Hello Simone
someFunc({ ...class[2] }); // My old friend James
someFunc({ ...class[2], greeting: 'Greetings' }); // Greetings James
someFunc({ ...class[1], greeting: 'Greetings' }); // Greetings Simone
```

Functions can ALSO be defined as a statement expression.  In such a case they are value that can be assigned, but are not automatically assigned to a variable outside of the function itself.  (When using a function declaration as a statement instead of a statement expression, a variable is automatically declared of the function name, and that declaration and assignment is effective "hoisted" - the function can be used earlier in the code than the declaration appears.  

```
A(); // "A was hoisted"
// B(); // would throw an error if called before assignment
function A() { 
  console.log('A was hoisted');
}
const B = function B() { 
  console.log('B will not hoist');
}
B(); // "B will not hoist"
```

Functions that are passed as parameters to another function are called "callbacks", and are used extensively in JS.


An addition made in ES6 was "fat arrow" or "arrow" functions (so named for the "=>" construct used).  These define anonymous functions as an expression, and are ideal for passed functions that are not used elsewhere.

- See Also: the "fat-arrow-functions" reading file

### Symbol

Symbol is a recent addition and isn't necessary to understand for the majority of JS devs.  It is included here merely for accuracy.  

## JS is a Dynamically and Weakly typed language

Many users of statically/strongly typed languages gain a great deal of pleasure out of mocking dynamic languages in general, and Javascript in particular.

I won't address their arguments here, but I will point out that JS remains the only generally usable web language that runs on every major browser, and when JS became runnable on the desktop it gained in popularity and success there despite the availability of these vaunted other languages.  Perhaps the critics are missing some vital detail?

That said, there are efforts to apply type-safety to Javascript, most notably TypeScript, a JS-like language that compiles to Javascript, so some level of compile-time type-safety can be had.  

For this class, we will not worry about such efforts and will focus on the fundamentals.  And when discussing types, it is important to know what you are discussing.  There are actually TWO different comparisons to make: dynamic vs static typing, and strong vs weak/loose typing. Popular and successful languages exist in all four quadrants these differences create.

### Dynamic Typing

In dynamically-typed languages, values still have types, but that type is associated with the VALUE rather than the VARIABLE.  A variable might store a string, and then get assigned a number.  While this is usually a bad idea, it's useful in two cases:
- a value comes in and is immediately transformed.  This is very common in the web, where many values are transmitted as text before being converted to their actual type.
- a value might be a collection or a single element of a collection, such as a string or an array of strings.  Often code complexity is decreased by not carrying around extra containers for your values, and the difference only matters in one or two places.  

Statically typed languages do not allow such behavior.  As a benefit, they (generally) can tell if there is a logic error in their code because two components have a mismatch in expected values.  As a cost, they often have a collection of added types/objects to handle the two cases that can create confusion as to what the actual data is and requires more effort to juggle the various types.  

Popular dynamically typed languages include Javascript and Python 

Popular statically typed languages include Java and C

### Weak Typing

Where dynamic vs strong typing is all about what types a variable can hold, strong/weak typing is about converting between types.  Strongly typed languages require explicit conversion between types, while weakly typed languages will perform conversion when it is required.

At the surface, weak typing seems like a terrible idea.  And it does come with issues, but good practices minimize the problems while still offering several benefits.  Automatic conversion, if happening where you expect, can greatly reduce the amount of "visual noise" in your code, making it easier to see the "important parts" of code.  

Compare:

```
if( name ) { 
  // do something
```

with 
```
if (name.length > 0) { 
  // do something
```

both are easy enough to understand, but if you're skimming over hundreds of lines of code, that first case, where a string is converted to a boolean value automatically, makes it very clear that _name_ is the important part.  Almost half of the non-space characters is _name_!  In contrast, the second example 'name' is less than 25% of the statement.  Weak typing creates the opportunities to have badly behaving code...and also creates opportunities to have more easily understood and maintained code.

Popular weakly typed languages include Javascript and C

Popular strongly typed languages include Java and Python

### Truthy/Falsy

As mentioned in the section on weakly typed languages, Javascript can automatically convert between datatypes, and one place that can offer real benefits is in using a boolean value to determine if a value exists.  This automatic conversion to a boolean is known as the "truthy" or "falsy" value (as opposed to the strict "true" or "false" value of an actual boolean.  

Because of the benefits this can offer to code readability/maintainability I recommend you know the rules for this conversion very clearly.

There are six "falsy" values - everything else will be considered "true" in a boolean context (that is, everything else is "truthy")
- false is falsy 
- null is falsy
- undefined is falsy 
- 0 is falsy 
- "" (empty string) is falsy (but not any space, only a string with no characters of any kind)
- NaN (Not a Number, a numeric value that represents a number that isn't) is falsy

Special notes:
- Strings with the above values are TRUTHY.  So the strings "undefined" or "0" are truthy, where the values `undefined` and `0` are falsy
- Empty arrays and objects are TRUTHY.  

## Blocks

A JS block is generally a statement with curly braces, such as an `if` statement, a `for` statement, a `while` statement, or a `function` statement.  While JS can have named blocks, just like most other languages that have them they tend to be indications that you have too much complexity and are generally avoided.

## Scope

JS uses "lexical scoping", meaning that a variable is available in the scope it is defined in and any nested scopes (unless "shadowed" by a variable of the same name within a nested scope).  References to values can be used outside of the defined scope if that reference was passed out of the defined scope.  (Example: a function can declare an object and return that object - that object and its various properties can be accessed outside the scope of that function).  Note that primitives (strings, numbers, booleans) cannot be passed by reference in this way, but objects and arrays/functions can (here is where everything else being an object matters).

`var` variables, function arguments, and statement-defined functions are all within the scope of the function they are defined within.  `const` and `let` variables are scoped to the block they are defined within.

## Loops

`for` and `while` are two looping structures.  The `for` loop has considerable flexibility compared to many other languages.  A common mistake is to iterate over all the indices of an array, when in the majority of cases the dev has NO INTEREST in the current index during the loop - they are just using it to get to the value they need.  Instead, they should just iterate over the elements themselves using `for..of`.

```
const words = ['I', 'Love', 'JS'];

// Bad example - we don't care about 'i'

for(let i = 0; i < words.length; i++) { 
  console.log(words[i]);
}

// Better example - focus is on the important parts

for( let word of words ) { 
  console.log(word);
}
```

In addition to the built in loop structures JS has several places where a function is passed that will be called over a series of elements iteratively: 

```
const words = ['I', 'Love', 'JS'];

words.forEach( function( word ) { console.log(word); } );

// Same thing, using a fat-arrow function
words.forEach( word => console.log(word) );

```

FP (functional programming) coding styles will often use iterative functions that are passed callback functions to transform collections and return the transformed result, often in a series of such transformations.

## Additional JS Resources

* MDN (Mozilla Developers Network) is a fantastic reference.  While W3Schools will often show up first in search results, I habitually enter "MDN " before whatever I am looking up so that I start with the MDN entry, and only look at other sources if I find MDN to be insufficient.  In addition to a solid API reference, they also have some tutorials:
  * https://developer.mozilla.org/en-US/docs/Learn/JavaScript
* Eloquent Javascript - an introductory book that is available online or in hardcopy
  * https://eloquentjavascript.net/
* You Don't Know JS - A book series (available online or in hardcopy) that is a truly DEEP dive, ensuring you understand the details of how things work.  I don't recommend this as a first exposure, but once you know the basics this is a great way to really stretch your knowledge.
  * https://github.com/getify/You-Dont-Know-JS



