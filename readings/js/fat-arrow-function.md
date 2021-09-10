# The "Fat Arrow" function

For many of those new to JS the so-called "fat arrow" function can be somewhat confusing.  This is because it has so many subtly different forms to learn while at the same time you are learning the JS syntax in general.

This is a quick summary of the important facets of the fat arrow syntax, but will only make sense in the context of understanding JS functions overall.

## The declaration syntax

The "fat arrow" function has a few different formats:

* `() => { doStuff(); moreStuff(); }`
* `foo => { doStuff(foo); moreStuff(); }`
* `(foo) => { doStuff(foo); moreStuff(); }`
* `(foo, bar) => { doStuff(foo, bar); moreStuff(foo); }`
* `({ foo, bar }) => { doStuff(foo, bar); moreStuff(foo); }`
* `() => doStuff();`
* `( foo ) => doStuff(foo);`
* `foo => doStuff(foo);`
* `() => ({ one: 1 });
* etc...

These are the result of different combinations of the different parts:

### Passed parameters (the function signature) 

The parts before the "fat arrow" ( `=>` ) indicate the parameters that are passed to the function.  

Like a function using the function keyword, this is zero or more params, where each param is the variable name (local to the function) that the value in that position will have.

Like a function using the function keyword, the params are listed inside parens EXCEPT that in the case of exactly one param, (not more, not less), the parens become optional.  When they are omitted is is done for the purposes of reducing the amount of "visual noise".  

These two function declarations are identical:
* `(foo) => {};`
* `foo => {};`

As far as passed parameters, these declarations are identical:
* `function(foo) {};`
* `foo => {};`

### Function body

The body of the function to run follows the fat arrow (`=>`).  Like with a function declared using the function keyword, the body is wrapped in curly braces (`{}`) with one exception noted further below.

This means that these function bodies work the same (except for the other differences between function keyword functions and fat arrow functions, in particular the binding of `this`).
* `function() { doStuff(); }`
* `() => { doStuff(); }`

### Function return values

A function body in curly braces (`{}`) always returns the value from a `return` statement.  If there is no `return` statement, the function returns `undefined`.  This is true for both fat arrow functions and function keyword functions.

However, a fat arrow function has an additional option.  If the function is defined with a single statement as the body instead of a curly-brace defined block of statements, the value of that statement is the return value of the function with no explict `return` keyword required.

This means these functions all return `3`:
* `function() { return 3; } `
* `() => { return 3; }`
* `() => 3;`
* `() => 1 + 2;`
* `() => [3][0];`
* `() => true ? 4 : 1 + 2;`

A return value does not have to be a primative value - it can be an array or an object.  This means there would be a potential confusion in the case of:
* `() => {}`

Would this be a function with an empty body that has no `return` statement, and thus it returns `undefined` (much like `function() {}`) or would it be a return value of an empty object (much like `function() { return {}; }`)?  This confusion is resolved by saying that the curly brace following a fat arrow ALWAYS begins a function bod.y.  This means, to declare a fat arrow function that returns an empty object (or any object) without using an explicit `return` statement you wrap the statement in parens (`()`) just like you can wrap any value.

These functions all return an empty object:
* `function() { return ({}); };`
* `() => ({})`;
* `() => { return {}; }`
* `() => { return ({}); }`

These functions return `undefined`:
* `function() {}`;
* `() => {}`;
* `function() { "hello"; };`
* `() => { "hello"; };`

### Combining the parts

Following the various options listed above, you should understand the meanings of each of these declarations:

* `() => { return [1]; }` // [1]
* `foo => !!foo;`  // true or false, based on truthy/falsy value of foo
* `(foo, bar) => { if( foo >= bar ) { return foo; } else { return bar; } };` // the larger of foo and bar
* `(foo, bar) => foo >= bar ? foo : bar;` // the larger of foo and bar

## Always Expressions

Functions declared with the function keyword can be be used as statements or expressions:

```
function foo() {}
```
This example of a function as a statement does several things:
* creates a variable in the current scope named `foo`
* creates a function that knows of itself as `foo`
* Assigns the newly created function to the newly created variable

```
var foo = function foo() {};
```
This example of a function declared as an expression does the same things as a function declared as a statement.  Note the use of "var" here - while `const` and `let` are preferrable, declaring a function as a statement creates a variable with the same rules as a variable declared as `var`.  Outside of demonstrating the same behavior, you can and should use `const` (or `let` when necessary`) in assigning functions declared as expressions.  These examples will continue to use `var` purely to show that that any differences in how the functions behave is not due to the keyword used in the variable declaration.

```
var foo = function() {};
```
This example of a function declared as a statement is ALMOST the same as a function declared as a statement, but the function itself is technically anonymous - while `foo` refers to the function (currently), the function itself does not consider itself to have a name.  This largely only matters for the purposes of debugging.

```
var foo = () => {}; 
```
Here we see a fat arrow function declared as an expression.  There is no statement version of declaring a fat arrow function.  Function expression declarations are not always used in direct assignment (for example, see declaring a function expression for use as an inline callback), so the assignment is not the important part, rather that the function is declared as an expresssion and not an assignment.

## Explicit binding of `this`

When a function declared with the function keyword is invoked, the value of `this` within that function is determined by any explicit setting (such as setting it via the bind() method), or it falls back to the implicit value (whatever the object before the dot where the function was invoked was).

When a function declared via fat arrow is invoked, the value of `this` within that function is determined as whatever the value of `this` was when the function was defined.

This means that inline callbacks are easily defined using a fat arrow because of the more succinct syntax, but that callbacks of any kind are conveniently defined using a fat arrow because callbacks are by far the most common situation when `this` is converted to an untended value, and using a fat-arrow function most likely preserves the intended value without any extra steps required.

