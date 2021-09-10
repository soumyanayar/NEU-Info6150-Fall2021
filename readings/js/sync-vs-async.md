# Synchronous and Asynchronous Javascript

## Synchronous

Basic JS is "synchronous", meaning each instruction completes before the next, and they run in the order given.  For each instruction, you know exactly what ran before, and what will run next.  There is no question about the state, because you can trance through the exact instructions that run, in order, and know what the state is at any point.  Every time you run synchronous instructions starting from the same initial state, the state will change in the same order each time.

```
console.log(1);
console.log(2);
console.log(3);

// ALWAYS 1 2 3
// always
```

Basic JS is pretty boring, but it is very reliable this way.

This is true even for more complex operations, like when a callback:

```
let counter = 1;

function report( callback ) { 
  callback(counter++);
}

console.log(counter++);
report( (c) => console.log(c) );
console.log(counter++);

// Still ALWAYS 1 2 3 
```
### Asynchronous

When your JS interacts with other things, such as users, networks, and/or other programs, then things get less certain.  Imagine a program with two buttons and a counter.  One button adds 10 to the counter, one button adds 1 to the counter.
The counter starts at 1.

What number displays next?

Answer: You don't know, it depends on what the user does.

When will the number change?

Answer: You don't know, it depends on how long it takes for the user to press a button.

Will the number ever show 5?  

Answer: You don't know, it depends on which order and how often the user presses buttons.

For "user" in the above, you could have "another system" or "a database" (which is just a specific other system).  For "presses a button" you could have "returns data".

Like with a web page that is waiting for a user button press, JS doesn't JUST wait.  It can run code.  It's not really "waiting" - it's running code and checking the event queue to see if there is new code to run.  If code takes a long time to run (let's say you had the computer loop and print 1 to 1 million when the user presses a button) it'd doesn't stop listening for other actions or more button presses...though it won't RUN the callbacks for those events until it is done with the first bit of code.  The events just queue up in the event queue to get handled when the engine isn't busy running other code.

In programming terms, it does not "block" - code continues to run while it is waiting for a response.  In blocking code, nothing else could happen until it got a response.

JS is rarely written to block.  (Hint: this is one of the reasons you should never use `alert()` - alert _blocks_, and that's bad for multiple reasons.

This "not blocking but unsure when code will run" is known as "asynchronous" behavior.

Because you can't know the order of events of asynchronous code, this means you can't be sure what the application state will be at any given moment.  You _do_ know that each synchronous code block will remain synchronous.  This means you can avoid the complexity that multithreaded environments have.  Without blocking code, you also rarely have to worry about creating too much delay in any synchronous block.  You should avoid long synchronous blocks such as the "print 1 to 1 million" example mentioned earlier, but it turns out that this is fairly simple because you rarely WANT to do that, so avoid long synchronous blocks is fairly easy when writing JS, as JS rarely blocks, so code that would usually introduce such delays (such as talking to the filesystem or a database) is already written to behave asynchronously.

### Sources of Asynchronous

When is something asynchronous?  There's no official list, but these activities are commonly async:
* Waiting on a user
* Talking to a filesystem (read/writing a file)
* Talking over a network
* Talking to another program (also often involves waiting on a filesystem and/or talking over a network)
* Explicitly waiting until a later time (example: setTimeout())

## The Golden Rule of Async: Once you go async, you stay async

This "golden rule" is my own terminology, but it is valuable advice.  

What it means is that if you have code that needs to get a value from some asynchronous source, you must REACT to getting that data.  Since getting that data is async, your using of that data must be async.  

While running, any code block itself is synchronous.  You can set up a callback to respond to an async source, and that callback WHEN IT RUNS will by synchronous, but in relation to the code block where you set it up, it is ASYNCHRONOUS. 

Within the synchronous code block where you depend on some async source, you CANNOT use any async value.  All you can do is set up an async response to getting it.

```
// This will not work
const someValue = getSomeAsyncData();
console.log(someValue);
```

When this code runs, this code is synchronous, and thus at that time `someValue` will be `undefined` (or whatever the function returns, see "Promises" below, but it will not be the data you are trying to get).

There is an exception to this: `async`/`await` is special syntax you can use to tell Javascript to turn your synchronous code into asynchronous code.  We'll cover more on that below, but it is vital that you understand how everything works WITHOUT using async/await.  I require everyone to learn asynchronous JS without using async/await for the simple reason that async/await doesn't change the rules, it just makes them harder to see.  Learn asynchronous code without async/await, and THEN you can use it as well as understand when it is and isn't helpful.

## Basic Async: Callbacks

Callbacks are not automatically synchronous OR asynchronous - a callback is just a function you pass to another function.

BUT - whatever function you call is itself synchronous, just like `addEventListener()` is synchronous.  It does whatever it does and returns.  The callback will run later, but the `addEventListener()` call is synchronous.

This is a good example of how a callback can be used to create an asynchronous effect.  Because all the code in a block WILL run synchronously, all async behavior is done via callbacks.  All async behavior is callbacks, but not all callbacks are async.

Event Listeners and `setTimeout()` and `setInterval()` are good ways to see async behavior with callbacks.

## The Pyramid of Doom

Asynchronous activities are often dependent on other asynchronous activities.

For example, talking to a database can be several steps, each of which is asynchronous:

* Connect to Database
* then, make a query to get some records
* then, for each record, do something.

Using callbacks, each step has a callback that itself has a callback.  Here's one pseudocode example:

```
connectToDb( dbParams, function( db ) { 
  db.runQuery( queryParams, function( records) { 
    records.forEach( function( record ) { 
      console.log(record);
    });
  });
});
```
(Note that `.forEach()` isn't async, but still takes a callback)

That is an overly simplistic example, and still has a lot of indention and `});` at the end.  Any "real" code like this will quickly get confusing as to how "deep" you are, particularly if you also have to add callbacks for errors:

```
connectToDb( dbParams, function( db ) { 
  db.runQuery( queryParams, function( records) { 
    records.forEach( function( record ) { 
      console.log(record);
    });
  }, function onQueryError( err ) {
    console.warn(`failed to run query: ${err}`);
  });
}, function onDbError( err ) { 
  console.warn(`Failed to connect to DB: ${err}`);
});
```

This is known as "The Pyramid of Doom" because of how you have many indents in to start with and end with many indents out.

You can "flatten" out this structure by making all of your callbacks named callbacks that are defined outside of the only place they are called, but that too can make the code confusing and harder to maintain.

## Advanced Async: Promises

A Promise is an object that tracks a completion state and manages related callbacks.  Promises are very convenient for handling asynchronous behavior.  

Promises are simple in concept but hard to explain because you have to understand all the parts at once to make sense of them.

### Key Principles of Promises 

* A promise has a _state_: pending, resolved, or rejected.
* Once a promise has become resolved or rejected, it never again changes state.
* When a promise resolves or rejects, it does so with a _value_ (that value might be `undefined`).
* A promise maintains a list of callbacks to call when/if resolved, and a list to call when/if rejected.

`whateverPromise.then(callback)` adds a callback for when/if the promise resolves and `whateverPromise.catch(callback)` adds a callback for when/if that callback rejects.

* The callbacks of a promise are called asynchronously (i.e. adding a callback to a promise will NEVER trigger that callback immediately - it will wait for any current syncronous code to complete)
* The callbacks of a promise are triggered even if they are added AFTER the promise has already resolved/rejected.  (e.g. a pending promise that is given a callback to call when/if it resolves will call that callback after the promise resolves.  A resolved promise that is given a callback to call when it resolves will still call that callback (asynchronously) even though the promise already resolved before that callback was attached. )

Each time you add a callback to respond to the promise state, the call returns a NEW promise. 
* This new promise will resolve/reject based on the callback you just added.  
* Adding the callback to the list of callbacks to run is synchronous and happens immediately.  It is only the calling of that callback that is asynchronous.

Example: 
`const promise2 = promise1.then(callback1);`

* `callback1` will only be called AFTER promise1 resolves or rejects
* `promise2` will be pending until `callback1` is actually called.  
* `promise2` will change state based on what `callback1` does WHEN CALLED:
    * if `callback1` returns a non-promise value (or undefined), `promise2` will resolve with that value
    * if `callbackl` throws an error, the error will be automatically caught and `promise2` will reject with a value of that error
    * if `callback1` returns a rejected promise, `promise2` will reject with a value equal to the value of the returned rejected promise rejected with.
    * if `callback1` returns a pending promise, `promise2` will remain pending until that returned promise resolves/rejects, at which time `promise2` will resolve/reject in the same way with the same value.

### Flattening the Pyramid of Doom

Instead of accepting callbacks directly, functions have asynchronous behavior can return promises.  The caller can then attach their callbacks to those promises.  

```
const dbPromise = connectToDb( dbParams );
dbPromise.then( function( db ) { 
  const queryPromise = db.runQuery( queryParams );
  queryPromise.then( function( records ) { 
    records.forEach( function( record ) { 
      console.log(record);
  });
  queryPromise.catch( function (err) { 
    console.warn(`failed to run query: ${err}`);
  });
});
dbPromise.catch( function (err) { 
  console.warn(`Failed to connect to DB: ${err}`);
});
```

That has some slight improvements - the error callbacks are now more clearly attached to being error conditions related to the original call - but it's not really much better.  But this is only part of the benefit of promises.

Because of the behavior of chained promises listed above (where a callback that returns a promise will cause the outer promise returned by the `.then()/.catch()` that added this callback to resolve/reject in the same way and with the same value) you can remove the nesting more than one level deep:

```
const dbPromise = connectToDb( dbParams );
dbPromise.catch( function (err) { 
  console.warn(`Failed to connect to DB: ${err}`);
});

const queryPromise = dbPromise.then( function( db ) { 
  return db.runQuery( queryParams );
});
queryPromise.then( function( records ) { 
  records.forEach( function( record ) { 
    console.log(record);
});
queryPromise.catch( function (err) { 
  console.warn(`failed to run query: ${err}`);
});
```

In fact, all of those "promise" variables only need to be used if we need them, otherwise we can call the methods directly off the return values without storing them in a variable at all:

```
connectToDb( dbParams )
.then( function( db ) { 
  return db.runQuery( queryParams );
})
.then( function( records ) { 
  records.forEach( function( record ) { 
    console.log(record);
})
.catch( function (err) { 
  console.warn(`Failure talking to DB: ${err}`);
});
```

This gives us a clear sequence of steps.  Note that we have only one `catch()` clause - that's because we have the potential for error once we removed `dbPromise` and `queryPromise` as separate variables.  Without them as separate variables we cannot handle their errors separately without continuing the change.  Whether that is a problem or not will depend on the application and how you handle an error, but it is always worth considering.  Shorter code is not always better code, and both of the last two versions of the promise code are more clear and maintainable than the callback versions.

### Promises and try/catch

An important caveat of how promises behave (or really, all asynchronous behavior, even non-promise callbacks) is that they are useless with the native `tr{}catch{}` syntax.  That's because the code inside `try/catch` runs synchronously, and by the time the callback runs (whether or not is managed by a promise) it is not "inside" the try/catch and errors will not be caught by the `catch{}`.

Non-promise callback situations handle this by either accepting another callback to call in case of an error, or by passing an error parameter to the callback.  Promises handle this by using `.catch()` to assign another callback to handle errors.  

### Cautions about asynchronous code
* It is VERY IMPORTANT to always have a `.catch()` at the end of a promise chain, otherwise you risk having an error that simply vanishes (because the Promise traps the error, you won't see it without a `.catch()` callback to do something about it.  It can go completely silently ignored and unreported.
* If you have a function that returns a promise, but that function fails BEFORE it returns the promise, the error occurs SYNCHRONOUSLY.  That means it will not be caught ina `.catch()` clause (unless you are already running code that was invoked asynchronously).  I recommend either using a try/catch construct or wrapping all your code in a function that returns a promise inside an immediate promise.  You don't want to assume the caller of your function will think to trap synchronous errors as well as asychronous ones.

Example of code that will not get caught by .catch():
```
function exampleOfBad() { 
  const foo = {};
  foo.bar.load(); // "cannot call method 'load' of undefined"
  return returnsAPromise(foo);
}

exampleOfBad() // throws error (does not return rejected Promise!)
.then( () => {  
  // will never happen
})
.catch( () => { 
  // will ALSO never happen
});
```

Example of using try/catch to catch such errors:

```
function exampleOfCaught() { 
  try { 
    const foo = {};
    foo.bar.load(); // "cannot call method 'load' of undefined"
    return returnsAPromise(foo);
  } catch (err) { 
    return Promise.reject(err);
  }
}

exampleOfCaught() // returns rejected Promise
.then( () => { } ) // never happens
.catch( (err) => { 
  // successfully handled
});
```


Example of using an immediate promise to catch such errors:
```
function exampleOfImmediatePromise() { 
  return Promise.resolve() 
  .then( () => { 
    const foo = {};
    foo.bar.load(); // "cannot call method 'load' of undefined"
    return returnsAPromise(foo);
  }); // because the error throws in a callback in a promise, promise catches and rejects
}

exampleOfImmediatePromise() // returns rejected Promise
.then( () => { } ) // never happens
.catch( (err) => { 
  // successfully handled
});
```

## Alternative Promises: Async/Await

Note: You will NOT use async/await for this class.  This is included here for educational purposes.  You should NOT even read this section until you are comfortable with the Promise contents described above

Promises are great, and once you learn them they can handle all the situations.  However some people find that they lead to a lot of "boilerplate" code - where you spend a lot of time writing very similar looking code that is also visual noise, hiding the important parts of the code.

Promises can also be a bit invisible - you have to know that a function returns a promise to take advantage of it.  If you think the function returns a value directly rather than returning a promise that resolves to a value, you can write code that looks great and may even run, but isn't correct and will fail.  

The solution to these problems is some native syntax support.  If you declare a function to be `async` (e.g. `async function foo() { }`) it declares that a function will return a promise.  That isn't too exciting, though it does allow tools and IDEs to notice when an asynchronous function is being improperly treated like a synchronous function.  

The real change comes from the `await` keyword used before a function call (e.g. `const bar = await foo()`.  This has some dramatic effects:
* All code following the `await`ed function is effectively wrapped in a callback that is called when the `await`ed function resolves.
* The value that the promise the `await`ed function returns resolves with is what the `await` effectively returns.  In the example, if `foo()` returns a promise that resovles with the value "cat", then `bar` ends up equal to `cat`.
* If the promise the `await`ed function returns rejects, it behaves like a thrown error.  This means a native try/catch around an `await`ed function WILL behave as desired.

Basically, `async`/`await` allows asynchronous code to be written as if it were synchronous code.  It is still async but most coding patterns for synchronous code can be used.

### Cautions regarding async/await

* Because the code looks synchronous, it is easy to think it IS synchronous, but it is not.
* You must remain vigilant about catching errors.  `async`/`await` shouldn't be thought of as _allowing_ try/catch, it should be thought of as _requiring_ try/catch (just as promises "requires" `.catch()` to avoid errors going unrecognized).  While `await` will raise errors rather than lose them, without care they will be poorly understood and out of context. 
* Trying to use async/await with an audience that is not familiar with async behavior can cause confusion as they struggle to understand WHEN different code will execute, since sync and async code now look alike
