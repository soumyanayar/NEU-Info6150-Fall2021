# 6150 Final Project Requirements

NOTE: Specific requirements are subject to change until Dec 1, but the overall requirements will not change and you should begin planning and working on your final project immediately

## Goals
- Demonstrate your understanding of skills from class
  - that means a project that does the absolute minimum, cut-and-pasting from samples, does not show much understanding
- Build a React-based Single-Page Application(SPA) 
  - About a topic of your choice
    - This can be a legitimate site about the topic, 
    - or a site about something not real, such as a fictional company

## Requirements

- Build a SPA using create-react-app
  - follow the requirements from class about react projects
- Your SPA should have at least 5 distinct "views"
  - This means the bulk of the page contents are replaced, not just small changes in content
  - These views are NOT separate HTML files ( this is a single-page application)
  - The views cover different aspects of your topic
  - Among these views will be the following aspects.  You can change the names to reflect your topic, but the purpose should be clear.  (For example, "About" can become"About Cats" or "About DynaTech" or "About Me"
    - "About" - a view that describes the topic or purpose of the website
    - "Privacy" - a privacy policy.  The contents do not need to be legally accurate, but should look like a real privacy policy
- You must have at least 1 form on your site with at least 3 input fields of any type
  - This form needs some form of validation
    - at least 1 field needs to prevent the form from submitting with invalid data
    - any required fields need to be indicated as required
    - the user needs to be told of any validation error and which field to correct
  - The form should store values in application state
    - Exception: any password entered will not be saved after submission or shown
  - The values entered should be shown somewhere on the site
- Your site must have at least two complex UIs 
  - "complex" means areas that are shown/not shown, and that involve nested elements that are styled
  - example: accordion, carousel, an elaborate form with changing sections, dropdown or slide-in menus
- The SPA has navigation that allows the user to switch between views
  - you can have views that aren't accessed through the navigation, but you must have at least 5 views that are accessed via the navigation
    - an example of a view that isn't accessed through the navigation is a view like search results - you get it by searching, not by navigation
- The SPA includes at least one example of a loading indicator (a spinner or other visual indication for the user to wait)
  - hint: a loading indicator should be inside an element with ARIA role of "status", and that element should be present on the page BEFORE the loading indicator shows up
- The SPA must included at least one CSS transform or CSS animation
- You must replace the README.md that create-react-app provides with your own
  - it must give a short description of what the project is
  - it must list the complex UI elements
  - it must say where to see the loading indicator
  - it must list any images/icons and say what the license terms are
- Your site must show content and navigation nicely down to 360px width on all views
  - add adaptive breakpoints as needed to achieve this
  - your CSS should be mobile first (works on mobile, then media queries to let it work on larger sites)

## Accessibility Requirements
- You must use Semantic HTML when possible/appropriate to provide the greatest default accessibility
- You must use HTML elements to provide base landmarks
- You must include a skip link to bypass navigation
- All interactions must be able to be done with keyboard, in addition to any mouse support
- You should use appropriate ARIA attributes from class to provide improved functionality when the semantic HTML elements are insufficient
  - Note: you are only required to provide these attributes where semantic HTML does not cover your needs
  - Hint: remember that most aria roles/properties are automatically provided by the appropriate semantic HTML elements.  Having an aria role should be rare.
- You should use the following aria states and properties where appropriate (and only where appropriate - the use of these is not required unless your UI creates the need):
  - aria-hidden
  - aria-expanded
  - aria-modal
  - aria-label
  - aria-labelled-by
- Your site must have at least WCAG level AA color contrast in your color choices

## Fake services

- You can use real remote services, such as the Pokemon API, but are not required to
- You can use some "fake" services that you write, or use any of the "fake" services I supply in the `fake-services/` sbudirectory
  - to use one of the provided fake services, see the README.md in the `fake-services/` directory
  - to write your own fake service, write it to return a promise that resolves with content after a 1 second delay

## Implementation Restrictions and Requirements

- Your code should follow the best-practices outlined in class
- Your code should be runnable with `npm install; npm run build; npx serve -s build` in your react project directory
  - Hint: Be sure to remove your `build/` directory and `node_modules/` to test that this works!
- You may reuse files or parts of files from previous assignments or classes - but they will be graded by the criteria here!
- Your CSS must be in a semantic or BEM style (with semantic labels)
  - You may otherwise organize your CSS and CSS files in any system you choose, 
- Do not use JS that wasn't written by you or wasn't provided with this assignment
  - No external JS libraries
- Do not use CSS that you didn't write or that wasn't provided by create-react-app
  - Exception: You are allowed to use font-awesome icons (CSS only!), provided you follow the licensing terms
- You may not use CSS floats to do more than manage flowing text with images
- You may not use HTML tables or CSS table layouts
  - Exception: If your content really is a spread-sheet-like table of data, you may use an HTML table for that content
- Do not have any files in your PR except for the project (no files from other assignments, for example)
- Use arrays and objects when they each make sense
- Do not use Map() or Set() for this exam
  - In order to ensure you use objects and arrays correctly
- Do not use `var`
- use `const` and `let` appropriately
- Do not use `alert`, `prompt`, or other blocking JS prompts
- Do not use poor variable and function names
- Do not have functions or components that are too big/do too much
- Do not have debugging console.log messages in your submitted project
- Do not have commented out code in your submitted project
- Do not use localStorage, sessionStorage, or indexedDB
- Do not use meta tag refreshes

## Extra Credit

Note: worry about the base requirements first!
- More complex UI elements beyond the minimum
- A site that feels useful/interesting/informative
- Interactions with real or fake services

## Submission Instructions

* Your project is submitted as PR to merge your branch `final` into main
* Be sure to include the reviewer(s) on your PR
* Project is due 11:59pm (PT) **Wed** Dec 15


