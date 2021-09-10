# Object and Array Destructuring

You are familiar with declaring and initializing a variable:

```js
const animal = 'cat';
```

But you come across some declarations that don't look quite right:

```
// assume `animal` is `{ name: 'Maru', state: 'inside box' }`
const { name } = animal;
```

This is an example of __destructuring__.

## Object Destructuring

Consider this code:
```js
const animal = { 
  name: 'Maru',
  state: 'inside box',
};

function checkAnimal( animal ) { 
  const name = animal.name;
  const state = animal.state;

  console.log(`${animal} is ${state}`);
}

checkAnimal(animal);
```

Though this is a very simple example, we copy out the values for `animal.name` and `animal.state` to make the rest of the code less "noisy" - we focus on the important parts (name and state) instead of having the unnecessary context label of "animal" repeated.  In more involved code, the difference in readability and skimability would be considerable.

We end up with variables (`name` and `state` that have the same names as the keys of the object that hold the same values.  That is, `name` ends up holding the same value as `animal.name`, and `state` ends up holding the same value as `animal.state`.

And that's what Object Destructuring does - assigns variables to hold individual values from an object.

Here's that same code using Object Destructuring:

```js
const animal = { 
  name: 'Maru',
  state: 'inside box',
};

function checkAnimal( animal ) { 
  const { name, state } = animal;

  console.log(`${animal} is ${state}`);
}

checkAnimal(animal);
```

The end result is the same - new variables `name` and `state` are declared, and given the values of `animal.name` and `animal.state`.

Notice how the syntax mirrors object declaration with variables:

```
const name = 'Maru';
const state = 'inside box';
const animal = { 
  name,
  state,
};
```
In this example, `animal` is created with keys that have the same name as the variable that provided the value.  The above is identical to:
```
const name = 'Maru';
const state = 'inside box';
const animal = { 
  name: name,
  state: state,
};
```
We prefer the version without the repeated name because omitting the repeats makes it more obvious when something DOESN'T match. Consider how the second example below makes it more obvious that one key is different than the variable name that was the source of the value:
```
// Unneeded repetition hides the difference:
const animal = {
  name: name,
  state: state,
  age: age, 
  guardian: owner,
  breed: breed, 
};
// Omitting the repetition makes the exception stand out:
const animal2 = { 
  name,
  state,
  age,
  guardian: owner,
  breed,
};
```

Destructuring can be thought of as the reverse of this assignment: Instead of using existing variable names and values to create object keys and values, we're using existing object keys and values to create variable names and values.

### Unreferenced Properties

If the object has properties that you do not reference, their values are ignored.  Just like the properties you name, they will continue to exist on the object, but they are not involved in creating new variables.

```
const animal = { 
  name: 'Maru',
  state: 'inside box',
  age: 'not telling',
};
const { name, age } = animal;
// `name` and `age` now exist and equal `animal.name` and `animal.state`
// no `state` variable has been created
// `animal` is unchanged, and still has all three properties with the same values
```

### Use with Function signatures

#### Inside the function
A common place to see Object Destructuring used is in the function signature where a function is declared.  When a function is passed an object, you can immediately destructure the object into separate variables.  Any properties of the incoming object you do not reference are ignored.

With this knowledge, we can reexamine the example used at the beginning of this topic:
```js
const animal = { 
  name: 'Maru',
  state: 'inside box',
};

function checkAnimal( animal ) { 
  const { name, state } = animal;

  console.log(`${animal} is ${state}`);
}

checkAnimal(animal);
```

Here it is when we move the destructuring to the signature and remove any direct reference to the object we are passed:

```js
const animal = { 
  name: 'Maru',
  state: 'inside box',
};

function checkAnimal( { name, state } ) { 
  console.log(`${animal} is ${state}`);
}

checkAnimal(animal);
```

Because the `checkAnimal(...)` function is only using the variables it pulls out of `animal`, having `animal` there is just a distraction.  The concept is similar to why we use `for...of` instead of a `for` loop that iterates over the index if we never use the index for anything else.  In the `for` loop, having an extra index variable that we use only to get the value we care about is just a distract.  Having an object we don't use other than access individual properties is also a distraction.  If we DO use the object in addition to accessing individual properties, then destructuring doesn't make sense.  Just like how we WILL use a `for` loop over an index if we use the index in other ways.  

#### Outside the function

A function that expects multiple parameters might decide that it expects a object even if the caller isn't expected to have an object.  Consider our `checkAnimal(...)` function if we didn't have an `animal` object:

```js
const name = 'Maru';
const state = 'Inside box';

checkAnimal( { name, state } );
```

Because we don't have an `animal` object, we construct an unnamed object that we immediately pass to checkAnimal(...).

This has some benefits:
- The order of the parameters to the object do not matter
- The parameters are effectively named

Let's expand on those points:

##### Parameter Order Does Not Matter

The order of keys when you declare an object has very little meaning.  (Technically JS does preserve the insertion order of keys in an object, but it is unusual for that to matter, and very unusual for that to matter when the object is passed to a function)

These two objects are functionally identical:
```js
const animal =  {
  name: 'Maru',
  state: 'Inside box',
};
```
```js
const animal = { 
  state: 'Inside box',
  name: 'Maru',
};
```
Similarly, passing objects with the keys in different order does not change the object that is sent.  When the object is destructured, the order of the keys in the destructuring does not matter - you get the same variables set to the same values.

These function calls have identical results:
```js
checkAnimal( { name, state } );
checkAnimal( { state, name } );
```

The more parameters a function has, the more it can be difficult to remember the order.  While IDE prompts can answer the question, when you are skimming code it can be easy to miss when parameters are passed in the wrong order.  Consider:
```js
function catInfo( name, age, state, guardian, doHighlight ) {
  //... do stuff with those params
}

catInfo( 'maru', 'inside box', 'Sasha', 'not telling', true);
```

It is very easy to miss that the parameters are in the wrong order.  When the order of the parameters doesn't matter, this is an error that cannot happen.

##### Parameters are Named

Passing parameters as an object means that any literal values passed to the function are passed with a descriptive label.  Consider the same function call from above, but with named parameters:
```js
function catInfo({ name, age, state, guardian, doHighlight }) {
  //... do stuff with those params
}

catInfo({ name: 'maru', state: 'inside box', guardian: 'Sasha', age: 'not telling', doHighlight: true });
```
Now, not only does the order not matter, but each field is described.  This is particularly beneficial when a value isn't clear from the value.  Consider this example without named parameters:
```js
function jumble(phrase, changeCase, changeWordSize) { 
  // jumbles a phrase as a word puzzle
}
const phrase = 'I like cats';
jumble(phrase, false, true); // returns "akstil ecI"
```
In this example, someone reading the code would not be able to easily notice what `true` and `false` refer to (They can check the function definition in their IDE, but at that point they have already (1) considered if it might be wrong and (2) paused their skimming to examine this specific call.  

Compare this to the same function call using named params:

```js
function jumble({ phrase, changeCase, changeWordSize }) { 
  // jumbles a phrase as a word puzzle
}
const phrase = 'I like cats';
jumble({ phrase, changeCase: false, changeWordSize: true }); // returns "akstil ecI"
```

Here the meaning of the true/false becomes obvious because of the named parameters.

### When the variable name does not match the key

Technically it is possible to declare a variable with a name OTHER than that name of the key that you are getting the value from.  This is fairly rare, as the syntax becomes more "noisy" and the result is arguably unclear.  If syntax adds confusion to someone reading your code, you may want to reconsider using that syntax.

```js
const animal = { 
  name: 'Maru',
  state: 'inside box',
};

const { state: doingWhat } = animal;
console.log(doingWhat); // "inside box"
```

### When to use Object destructuring

- When you have a function taking a number of related parameters
  - Particularly if you have 3+ parameters
- When you have an object where you don't want the object name to distract from the work you are doing with particular properties

## Array Destructuring

Consider this closure function:

```js
function makeCounter() { 
  let count = 0;
  const reset = function() { count = 0; };
  const use = function() { count += 1; return count; };
  return [reset, use];
}

const counterResults = makeCounter();
const reset = counterResults[0];
const use = counterResults[1];
```

The `makeCounter()` function returns an array of two functions.  Pulling those functions out into named variables creates a visually "noisy" block of code that puts the visual emphasis on the temporary `counterResults` variable.

Now consider this example:
```js
function makeCounter() { 
  let count = 0;
  const reset = function() { count = 0; };
  const use = function() { count += 1; return count; };
  return [reset, use];
}

const [ reset, use ] = makeCounter();
```

Just like with object destructuring, we are assigning the value into a syntax that resembles the item being destructured.  

In this case, the items from the array are assigned to new variables based on their position.  Unlike with object destructuring order definitely matters, which makes sense because arrays are all about order, while an object is all about the names of the properties.

### Array Destructuring with Functions

The array destructuring syntax can be used in a function signature, but it is very unusual to do so - function parameters are naturally positional, so there is no added value to creating or destructuring an array.

### When to use Array Destructuring

When an array holds distinct items that you want to reference individually, you can use array destructuring.  Unless an array is a natural fit for the data you should consider if using an object instead.

## More Info

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
- https://www.freecodecamp.org/news/how-to-use-destructuring-in-javascript-to-write-cleaner-more-powerful-code-9d1b38794050/

