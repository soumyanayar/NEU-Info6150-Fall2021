# The Trinity of the Web

The normal web experience for the user consists of three parts:

* HTML - this provides a structure for the data (including the text - text without structure is just a string of characters)
* CSS - this provides rules to declare how a set of structured data will be visually represented
* JS - Javascript provides the ability to add interactivity to the page, including but not limited to:
    * Modifying the structure of the data (the HTML) 
    * Modifying the content of the data (the text, images, etc)
    * Modifying the appearance of the data (in a few ways, including indirectly via the above, changing the above so that the applying the CSS rules gives a different result, and interacting with services to read/write backend data)

Example: 

A user goes to a search engine - the browser loads the HTML, including fetching the CSS and JS referenced in the page, and combines the structure of an HTML form (with a search text input and a submit button) with the CSS that has rules for how different HTML elements will display to create a visual representation.  The JS runs and adds event handlers to handle events when the user types in the field and when the user clicks the button.  

The user then types "cat".  The browser fires events for each keypress, and the JS handler that was attached to handle these events fires - in this case, that code makes a web service call to get suggestions.  

The search engine gets the request with the partial text.  It parses the incoming data and decides what kind of thing is being requested ("give me matching searches"), the incoming data ("c", "ca", or "cat"), runs any code to figure out the answer, converts that answer into some sort of parsable format, and returns that list. 

When those suggestions come back, the JS reads the returned data and modifies the HTML to create a div with a list of suggestions ("cat playing a piano", "catastrophe", "cat and mouse") and the browser combines the modified HTML with the CSS rules to determine the new appearance of the page. To the user, the page has "changed", but tot he browser it is the same page with some content modified.

The user makes a selection from that list, and the user's browser submits the search.  Perhaps the JS again requests a set of data to update the page in-place, or perhaps it requests an entirely new page.  Let's say the latter in this case.  The user's selection goes as request to the search engine. Again, the search engine decides to handle the response.  In this case, instead of sending back a set of data for the JS on the existing page to parse, the search engine returns a whole new page, which includes its own CSS and JS. The browser (which new it requested a new page - it made the request, after all) replaces the existing page with the newly rendered content containing the list of search results.  Each result is a link to request that page as a new page.

At each step in the process:
* The HTML represented the structure and content of the page
* The CSS gave rules that decides the HTML appearance, depending on if and how the HTML matches those rules
* JS added dynamic reactions to events and the ability to modify the HTML
* When the modified HTML contained different data, that data was displayed
* When the modified HTML matched different CSS rules, those rules would impact how things are displayed
