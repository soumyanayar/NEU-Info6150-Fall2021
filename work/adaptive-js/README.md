# Adaptive JS Assignment

** Due 11:59pm PT Oct 14 **

## Goal

- You will add a `styles.css` file and a `adaptive.js` to this directory so that viewing the `adaptive.html` in a browser gives an experience like that show in the provided animated image.

## Requirements

In particular, two key features:
- The core JS feature:
  - Clicking the button/submitting the form will increment the shown count
    - If there no label typed into the field, the button is disabled
      - Hint: setting the `disabled` property on a button to true/false will disable/enable the button.
  - Modifying the input field and clicking the button will change the label and show the incremented count FOR THAT LABEL
    - Hint: By default the form will submit!
    - Hint: You can define event listeners for `click` (any element), `submit` (form elements), and `input` (form input fields) 
    - if that label has been incremented before the cumulative total is shown.
      - Hint: create an object that holds the count for each label.  That way switching to a new label does not remove the counts of previous labels.  
        - Deeper Hint: A new value in an object defaults to `undefined`, so you can't just add one when it is new. But undefined is falsy, and undefined + 1 is `NaN`, which is also falsy, so you can use this to add one to the value OR set the new value to 1.
  - The form should be usable by keyboard or mouse
- The core adaptive feature:
  - on desktop dimensions of more than 600px width the info box will appear on the LEFT of the input area
  - on a mobile device of less than 600px width the info box will appear ABOVE the input area
  - on desktop dimensions of more than 600px width the header text is at a larger size
  - on a mobile device of less than 600px width the 
 
Don't forget matching additional parts of the requirement image, not just these core features.
- the font is just `font-family: sans-serif` of the default browser font.  
- Hint: The "Info" title is just moved 

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'adaptive-js' (`git checkout -b adaptive-js`)
* add the necessary files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and myself reviewer(s)

## Restrictions

- Do not use table, CSS table-cell, floats, or other related concepts for layout
- use rem-based values for padding/margin
- Do not use outside JS or CSS libraries
- Do not modify the HTML

