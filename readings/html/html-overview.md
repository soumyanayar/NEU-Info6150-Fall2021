# HTML Overview 

This is a high level overview of HTML and the best practices.  As with the other material you are expected to be familiar with for class I highly recommend reading more into the topic (See Additional Resources at the end)

## Programming in HTML?

Depending on your definition, HTML is a language, but is not a programming language.  There are no conditionals.  There isn't data storage and retrieval.  There is just text and meta data about that text.

A collection of HTML is known as a "document", and a rendered document is considered a "page".  

## Forgiveness

The web in general, and HTML in particular, follows the maxim of:  "Be strict in what you produce and forgiving in what you accept".  Because of this it is very possible to make "wrong" HTML that seems to work just fine.  That's because HTML clients (i.e. web browsers) will do their best to accept wrong input and interpret it as what was probably intended instead of throwing an error.

There is debate about whether this was good (This made it easy for the web to become popular because it was easy to make "working" content) or bad (It is hard to become more strict when there is so much of the web that would break if we got more strict), but for a web developer it is definitely a reality.  

As a web developer you should strive to be _correct_ in all things, not just "what works", because if you are not correct you cannot be sure it will continue to work in the future or in a different browser.

## Purpose of HTML

While the initial purpose of HTML was to organize and decorate the text, the modern purpose is to organize and _describe_ the text.  Put another way, the purpose of HTML is to present the text in an organized and described way, NOT to _present_ the text (i.e. not to control how the text looks).

This is covered more in the Best Practices section, but do not use HTML to control the appearance of the text.  That is the job of CSS.

## Tags and elements

HTML is plain text that has "elements".  Elements are text wrapped in tags.  A tag is a value in angle brackets. (`<>`).

### Nesting elements

Elements provide metadata about their contents.  The contents can be text, other elements, or a mixture of both (or nothing - the element might have no contents).

Because of this, one fundamental rule of HTML is that elements can NEST (an element can contain other elements, and can be contained within an element) but cannot OVERLAP (an element either wholly contains another element or it wholly does not.  An element cannot begin inside another element and finish outside of that element.

#### Parents, children, siblings, and ancestors/descendants
An element that directly contains another is the contained element's "parent" element.  The directly contained element is a "child" element.  Two elements that are child elements (children) of the same element are "siblings".  An element that contains, directly or indirectly is an "ancestor" of the contained elements, while an element that is contained by another, directly or indirectly, is a "descendant".  

Certain elements are not allowed to contain certain other elements (a `<p>` element cannot contain (be an ancestor of) other block-level elements, including other `<p>` elements), and certain elements are only allowed to have other certain elements as children.  (an "unordered list" element (`<ul>`) can only contain "list item" elements (`<li>`), but the "list item" element CAN contain almost any other element, so while the children of an "unordered list" element are restricted, the descendants of an "unordered list" element are not.

These rules can be found by looking up each element on MDN, but most of them make sense if you follow the purpose of an element.  An unordered list is a collection of list items, so that rule is easy.  A paragraph (`<p>`) is...a paragraph, so again, the rules naturally follow if you follow the purpose.


### Opening/Closing tags
An element can be an opening tag, content, and a closing tag.  Closing tags have a slash (`/`) as the first character inside the angle brackets.

`<p>This is some content between an opening and closing tag</p>`

The content is optional:
`<p></p>`

By convention HTML tags should use lowercase  (e.g. `<p></p>`, not `<P></P>`) though Microsoft used uppercase for a long time so older documentation will still reflect that.

### Self-closing elements

An element can be self-closing, by having a slash (`/`) before the closing angle bracket.  Self-closing elements have only a single tag.  Self-closing elements cannot have content.

`<p/>`

### Comments

HTML comments are inside special tags: 
`<!-- This is a comment -->`

Notice is is not a normal element with a closing tag, nor a normal self-closing element.

Comments CAN be multiline, and CAN contain other tags (normally treating those tags as text), but you cannot nest comments (the first comment would close as soon as it hits the first comment closing, which would break if you have one comment inside another.

Because HTML comments are:
* Cumbersome
* Unable to be nested
* Showing comments to anyone in the public that wants to read them

...they are not often used

### Doctype

A special tag can be placed at the top of an HTML file to indicate what HTML parsing rules to use.  This is a way of dealing with some of the problems of the "forgiveness" principle mentioned earlier - by using this, the document can indicate WHAT parsing rules to follow, including more strict rules.  By "opting in" to these rules, we can have confidence the author wasn't relying on the more lax set of rules.

After a period of experimenting with very strict, XML-like rules, the modern convention is to use:

`<!doctype html>` 

which is the HTML5 doctype.  HTML5 is regularly updated, but is backwards compatible so that new rules can be sure to to break previous documents. At some point a different doctype may be needed, but the intention is to avoid that.

### Attributes are properties

Beyond the text content and the tag name, elements can have additional metadata.  This data is done in key=value pairs in the opening tag (or the only tag in the case of self-closing elements).  These are known as "attributes".

* Attributes are always text
* The syntax is `keyName="value"` (e.g. `<p data-foo="blah"></p>`)
* Attribute names are normally all lowercase, no spaces, though `data-` is a special prefix
* An attribute might have no value as a boolean indicator for that attribute.  In such case it is known as a "property".  (e.g. `<p contenteditable></p>`)
* Each defined element type has a list of valid attributes, most of which are optional

#### The id property

One special property an element can have is `id`, which defines a unique-to-this document label for the element.  Ids should have no spaces or special characters other than dash (`-`) or underscore (`_`).

While you COULD give every single element in the document an id, in practice this is only done on elements that will be referenced by something else. (be that in the HTML, in the CSS, or in the JS).

Because ids need to be unique, which is an extra bit of complexity if your document is dynamically generated or if you are only writing part of the content for the page and do not know what other ids may be used by the other sections, it is common to:
* use classes (see below) instead of ids, as they do not have the uniqueness requirement
* use an id on the outermost element you will be working with, and use classes within it, so that you only need to worry about that one uniqueness requirement
* have the ids be programmatically assigned, and have all your references be able to be filled in with the appropriate generated id name

You can see why ids are not used on all that many elements.

ids are _required_, however, if one element has a reason to refer to another.  (Usually this comes up when the metadata for an element refers to another, such as a `<label>` element needs to say which `<input>` element is is the "label" for, or when an element containing the text of a message for the user needs to indicate what element on the page the message refers to.

By default, you can tell a browser to load a page at the location of an element on the rendered page by adding `#<id>` to the end of the url, where `<id>` is the id value for the element.  

By convention id names are kebab-cased.  There is no enforcement of this, however, so it is not uncommon to see camelCased ids.

FOR THIS CLASS YOU ARE REQUIRED TO USE kebab-cased id names only.

#### The class property

Another special property is the `class` property.  This has NOTHING TO DO with programming classes.  This means more like "category" or "classification", and is just a list of labels on the element.  It has no impact on the element itself.  Any impact will come from CSS or JS.

A `class` property is a space-separated text-based list.  So an element with class "foo" and "bar" would be `<div class="foo bar">`

Normally the order of classes makes no difference, though poorly written JS CAN make that matter.

Classes are very common way to allow CSS and JS to apply to certain elements in the document.  

By convention, class values (known individually as "class names") are kebab-cased.  There is no enforcement of this, however, so it is not uncommon to see camelCased class names, or even the very hideous mixture of both kebab-case AND camelCased.

FOR THIS CASE YOU ARE REQUIRED TO USE kebab-cased class names only

#### The data- (dataset) property

One last special property to mention is the special data- prefix (known as "dataset" because of how JS accesses it).

JS adds dynamic abilities to an HTML document.  This means that it often has to associate some data with an element.  This might be as simple as saying which element is considered "selected" or "active".  Othertimes it might associate the element with some data from the backend where the data came from.  

Classes can (and often are) used for the more straightforward purposes (such as adding a class "active" when an element is considered active by the UI compared to its siblings), but when connecting other data this gets clunky.  If I need to associate every `<li>` element listing student names with the NEU ID of that student, _could_ apply a `neu-id-NNNNN` class with NNNNN as the appropriate number, but then if I need to get that number I have to get all the class names, pull out the one that starts with `neu-id-`, and grab the rest of the name as the number I need.  This is tedious and error-prone, so a special interface for additional data was added.

Any property name beginning with `data-` is such a case, and the "real" name for the property follows the "data-" in the name.  The value (which must still be text) is assigned as normal to the attribute.  JS has a special method to pull this property and value.  You can learn more by searching for "MDN dataset".

## HTML Best Practices

Best practices are always changing and rarely universally agreed to, but you are required to follow these best practices for this class and I recommend them to your future workplaces.

Each practice is explained in more detail below

* Use valid HTML
* Move styling and JS out of the html file
* Avoid JS or styles inside the tag
* Use lowercase tags
* Use HTML5
* Do not use presentational HTML
* Use basic semantic HTML
* Use kebab-case class names
* Use meaningful id or class names

### Use valid HTML

You should never rely on browsers interpreting invalid HTML correctly, because that could change at any time and/or your HTML may be consumed by something else (another browser, a program, ...) that applies different interpretations.  

This does not mean that every technical violations must be removed - there are some small rules that may be violated to be compatible with older browsers, to enable some dynamic features, or because the de facto standard is different than the technical rule.  Nonetheless, any exception should be a standard exception.  Otherwise, use valid HTML.

### Move styling and JS out of the html file

Have separate CSS and JS files rather than being the content of  `<style>` or `<script>` tags in the page.  There are limited exceptions to this.

### Avoid JS or styles inside the tag

Do not use the `style` attribute or any `onNNNN` attribute.  Styling is best attached via selectors from an outside file, and scripting is best attached to events from JS loaded from an external file.

### Use lowercase tags

Fairly self-explanatory.  Even though browsers may accept tags in any particular case, ALL HTML (including properties, attributes, and tags) should be in lowercase.

### Indent 2 or 4 spaces (or by tab)

These are the standard indention level, either 2 characters per indentation or 4 characters per indentation.  There is a long-running debate about whether to use spaces or tabs (1 tab = 1 level of indentation).  The most common case is to use spaces, and you should match whatever your workplace follows.  

You _must_ be consistent in which you use within any file, however, or people will hate you.

### Use HTML5

This means having an HTML doctype, and following the general rules of the HTML5 spec(s) to the extent that browsers support it.

### Do not use presentational HTML

There are certain tags and attributes that have the purpose of providing a particular appearance.  Do not use them, rely on your CSS for styling. 

This includes using tags purely for how the default browser rendering modifies your result.  (Example: Don't have multiple empty paragragh or break tags to create space).

This does NOT mean that you can't use tags that do have useful default styling, such as lists and b and i tags.  So long as the tag has meaning outside of the appearance, it is fine to use.

This also does NOT mean that you can't insert some tags around content just so that you can target that content with CSS.  Unfortunately, we often have to do this, though you should minimize it.

### Use basic semantic HTML

Try to use tags that describe your document.  It's possible to use entirely div tags...but don't.  Make use of tags for their structural meaning whenever you can.

This often has limitations.  That's fine.  Make the most of it you can, because it usually ends up making things easier later.

### Use kebab-case class and id names

Though this convention is not as strictly followed anymore, I'll still ask you to follow it: any classes listed in the "class" attribute should be all lowercase words separated by hyphen (-) characters.  (known as kebab-case)  This can feel odd, as JS variables will have a different standard, but that's the convention.

### Do not create your own properties or attributes on existing tags

Browsers can let you get away with doing so, but it is almost always a bad idea.  If you need to associate some data with a tag, use the dataset attributes, which let you use "data-NNNN" as an attribute, where NNNN can be any kebab-case word or words.  This should occur rarely - associating to much data to an element in the attribute means that it is not easily reachable - better to put that data in the page as content.

### Use meaningful id or class names

Your id and class names should reflect the structural effect or higher-level summary of the content.


## Additional Resources

* MDN, for both tutorials and reference.   In particular, the basics found here: https://developer.mozilla.org/en-US/docs/Web/HTML
