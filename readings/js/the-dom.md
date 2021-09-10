# The DOM

## What is the DOM?
DOM is the 
* Document
* Object
* Model

...which is:
* A hierarchical tree of nodes
* representing rendered elements of the page
* with each node (and the root nodes of `document` and `window`) presenting methods to interact with the nodes and the page

See also: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

Special note: Technically text can be one or more nodes.  This can be really frustrating to deal with, fortunately you almost never have to deal with it.  I mention it here just so you know that is a possibility.

## What can the DOM do?
* Search for nodes (elements)
* Read details from a node
  * such as text, values, rendered css properties, etc
* Write details to an existing node
* Create new nodes
* Listen and react to events

### Searching for nodes

A node can search its descendants using these methods.  `document` will search the entire document.
* `.getElementById()` - pass id.  Note "getElement", not "getElements"
* `.getElementsByClassName()` - pass classname. 
* `.getElementsByTagName()` - pass in a tag, such as 'p' or 'div'

The above uses strings without special indicators, such as "my-class" rather than ".my-class".  More commonly, you can use the same selector syntax you use with CSS, using these methods:

* `.querySelector()` - pass the selector string, returns first matching node, or null if no matches
* `.querySelectorAll()` - pass the selector string, returns a NodeList with all matches (or null if no matches)
  * Note: A NodeList is LIKE an array, but is NOT an array.  If you are trying to treat it as an array and it doesn't work, use `Array.from(myNodeList)` to convert to an actual array.

Example:  `document.querySelectorAll('div.special');` will return a NodeList (or null) of all nodes that represent `div` elements that also have 'special' as one of the space-separated values on the `class` attribute of the element.

See Also: MDN entries for these functions, such as https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

### Reading from a node

All the data about a node (except which listeners are attached) is available, the full list is huge.  (See https://developer.mozilla.org/en-US/docs/Web/API/Node for the full list of methods and properties).

Common values to look at are:
* `.value` - for form inputs/selects/etc, this is the current value or currently selected value (for `<select>`)
* `.dataset` - this is a special object that has key/value pairs for any `data-XXX="YYY"` on the element.  The keys will be the XXX values and the values will be the YYY.  This is used when you want to associate data with an element but not show that data in the rendered output.
* `.classList` - because the `class` element represents a space separated unordered list, you don't want to interact with the `class` attribute itself (you can, but it's a bad idea).  Instead, you can use the `.classList` object methods to check to see if a class is included (`.classList.contains()`).
* `.selected`, `.required`, `.disabled`, `.checked`(.checked exists for checkbox/radio only) - boolean indicators that say if the appropriate HTML property is set or not.

### Writing to an existing node

Just about all of the data that can be read can also be written.  Generally this is done just like reading, except you assign to the value.  Note that mostly these are NOT function calls.  E.g. `myButton.disabled = true;`

Remember that HTML properties should be treated like booleans (and they will or will not be present in the HTML) while HTML attributes can only have string values (even if you assign `2`, it will become "2").

Common values to assign to are:
* `.value` - as with Reading above, but you can assign the value, including creating one that had no previous value
* `.dataset` - as with dataset above, but you can assign a value (this includes creating new `data-XXX` attributes) by treating dataset like an object.  E.g. `myButton.dataset.foo = 'test'` will modify the `<button>` to include `<button data-foo="test">`
* `.innerText` - The text content (if any) of the node.  
    * This replaces any children of the node, so you usually only do this if you know you are on a leaf node or if you deliberately want to destroy the existing child nodes.  
    * `.innerText` is good to use if you are showing content that originally came from users, because it will prevent them from injecting HTML into your page. (injected HTML is a big source of security holes in web applications)
* `.innerHTML` - The HTML content (if any) of the node.  This replaces any children of 
    * This replaces any children of the node, so you usually only do this if you know you are on a leaf node or if you deliberately want to destroy the existing child nodes.  
    * `.innerHTML` is good to use to create new collections of nested nodes on a page, but should be used very cautiously if any content came from an untrusted source (such as a user), because injected HTML is a big source of security holes in web applications.  More on using `.innerHTML` in "Creating new nodes" below.

### Creating new nodes

There are two basic ways to create new nodes using the DOM:
* You can use `document.createElement()` (see MDN) to create an unattached node, modify any attributes/properties of that node, then call `.appendChild()` on the intended parent node to attach the new subtree.  
    * This has the benefit of having good control over the HTML you are creating (avoiding the `.innerHTML` security issues below) but can very quickly get tedious if you are creating a large structure of HTML, as each element will have to be created, modified, and attached.
    * This also has the benefit of not replacing any existing children - you are appending, not replacing.  
* You can use `.innerHTML` on the parent node and assign the nested HTML you want to create as a string.  
    * This new HTML can have any attributes/properties set just like normal HTML - you are just creating the HTML as a string, and the DOM will translate it into new nodes.  
    * This new HTML can have any level of nested HTML content without extra effort
* Because using `.innerHTML` is so much easier to maintain and understand, I recommend it over `.appendChild()` if don't need to preserve existing children (and if you do have to preserve existing children, I recommend appending only the top level and setting the `.innerHTML` of that content).  
    * As a result, you will ALWAYS need to be diligent to consider the security implications of what you are assigning to `.innerHTML`.  
    * And as a result of that, I recommend using front end libraries that can prevent such HTML injection attacks

### Listen to events on nodes

A web page isn't just text, it is a document that the user ( and the system ) can interact with.  You can react to these interactions using "events".

#### The Event Loop

JS is single-threaded as far as running your JS goes.  Most engines ARE multi-threaded, and do things like system/network I/O and UI decisions in other threads, which is why using blocking calls like `alert()` are bad, but as far as YOUR code goes, it is single-threaded.  

Here is a simplified version of what happens:
* JS Engine has some code to run, it runs it all
* JS Engine then checks to see if any code has been triggered to run because of an event.
* If so, return to the top of this loop with the first such code as code to run
* If not, return to the "check" step above

This perpetual loop is known as the "event loop".  While the JS is running, events can happen, such as a mouse moving, clicking, etc.  These events HAPPEN, but they don't actually generate any response from code until any previously queued up code has run.  Normally this is a very fast process, but I'm sure you've seen some sites where you click a button and there is a notable delay before you see any visible reaction.  

Events are considered "asynchronous", meaning that they can happen in any order and at any time. 

#### Attaching a listener

A "listener" or "handler" is a function that you pass as a callback, telling the DOM to attach it to a particular event.  When that event happens, the callback is added to the queue of code to run.  (And does not actually run until the event loop reaches it in the queue).

The best way to attach a listener to an event for a node is to call `.addEventListener()` on the node, passing it the event name (e.g. 'click') and the callback.  If you need to later remove the listener you can pass the same callback to the `.removeEventListener()` method of the same node.

Example:
```
const myDiv = document.querySelector('div.special'); // Only selects first match node
let clickCount = 0;
const callback = function() {
  console.log('ouch!');
  clickCount += 1;
  myDiv.innerText = `pressed ${clickCount} times`;
};

// Yes, you can click things other than buttons and links!

myDiv.addEventListener('click', callback);
```

You can attach listeners directly into the HTML as an attribute.  DO NOT DO THIS. 
* It is hard to maintain (buried in your HTML)
* Hard to change (it's in the HTML) dynamically
* You can only attach one such listener to a node

You can attach listeners via JS by assigning to the appropriate property on the node.  (e.g. such as assigning to `.onclick` of a button node).  DO NOT DO THIS.
* You can only attach one such listener to a node - new listeners will override the existing one

#### The event object

The callback on an event listener will be passed an event object when called.  If the callback doesn't need data about the event, you can ignore this.  But if you need to know details beyond that the event itself HAPPENED, you can tell your callback function to expect to be called with a parameter.

#### Event defaults

Some events have default behavior, such as links being followed when clicked, and forms submitting.  If you want to prevent this behavior, you can call the `.preventDefault()` method on the event object in your callback.

#### Event Propagation (event bubbling)`

Events propagate, or "bubble".  This means that after the listeners for an event on a node are called, the listeners on that node's PARENT are called, and so on until the listeners at the top-level document are called.  

This can be vary convenient.  For example, in making a to-do list where tasks can be checked or unchecked, it is complex to have a listener on each and every item, particularly when I'm adding and removing items (which means I have to add listeners to new items at least).  Instead, I can put a single listener on the parent node (or any ancestor), and react to the clicks there with a single listener.  I can add and remove children without having to change the listener at all.

Of course, the listener might need to know which item was clicked, such as in our to-do list example.  The `.target` property of the event object passed to the callback will equal the node that originally received the event, even though the listener wasn't attached to THAT node.  This is often where the `.dataset` property is used - you can read data from the clicked node and react to it, from a listener that is NOT on that node.

If you need to prevent an event from propagating to ancestors, you can call `.stopPropagation()` on the event object that is passed to your callback.
