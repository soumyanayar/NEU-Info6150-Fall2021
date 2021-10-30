# React Intro Assignment

** Due 11:59pm PT Thu Nov 4  **

## Goal

Create a react project that:
- has a component with state that is modified
- conditionally displays another component
- this other component uses a callback to modify the ancestors state
- uses CSS on elements in a component
- uses a CSS animation to show a fade-in effect


## Setup Requirements

- Create a react project named "inventory" using create-react-app inside this directory
- Modify the files in the src/ directory inside inventory/ to meet the requirements
- For css, you can add/modify as many css files as you want in /src, including src/index.css that is also applied to the output.
- Remember to meet the initial changes required in class:
  - change your App.js to App.jsx (requires a server restart)
  - change/replace the default css className to be kebab-case
- You will need to create a Reorder.jsx for the Reorder Component
- The Reorder component should only accept one prop, "onReorder", which should be a function that takes no arguments.  When called, it will set the count to 5.

## Functional Requirements

Your App component:
- displays a count for an inventory
- allows you to increase/decrease the displayed count
- offers a "Reorder" button when the count is 0
  - implement this in a Reorder component that is only shown when the count is 0
  - which adds 5 to the count
- does not allow you to decrease the count below 0
  - hint: put a `disabled={!count}` prop on the button 
- Pressing the Reorder button sets the inventory count to 5

## Visual Requirements
- The buttons should have some space between them and each other as well as the output text
- the inventory count, the +/- buttons, and the Reorder button should all appear on the same line
- The Reorder button is only shown when the Count is 0
- When it appears, the reorder button will have a "fade in" animation
  - hint: set a CSS animation on the element or a wrapper of the element to animate from opacity 0 to opacity 1.  Use a CSS animation (with keyframes) instead of a CSS transition.

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-intro' (`git checkout -b react-intro`)
* add the necessary files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and myself reviewer(s)

## Restrictions

- Do not use table, CSS table-cell, floats, or other related concepts for layout
- Do not use outside JS or CSS libraries 
- Follow the methods used in class or described in this README


