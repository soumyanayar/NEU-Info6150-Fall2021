# React Intro Assignment

** Due 11:59pm PT Thu Nov 18 **

## Goal

"Tabs" are a variation on the accordion UI pattern
- instead of titles with expanded/collapsed sections underneath them
- you have a row or column of titles
- and a single body area that show the content for the most recently selected title

Build a `<Tabs>` react component
- and show it with data for 3-5 tabs

## Setup Requirements

- Create a react project named "tabs" using create-react-app inside this directory
- Modify the files in the src/ directory inside inventory/ to meet the requirements
- For css, you can add/modify as many css files as you want in /src, including src/index.css that is also applied to the output.
- Remember to meet the initial changes required in class:
  - change your App.js to App.jsx (requires a server restart)
  - change/replace the default css className to be kebab-case
- You will need to create the Tabs component
- You will need to create data for the tabs that is passed to the Tabs component in App.jsx
  - see the accordion example in `samples/` for an example of how to create/pass such fake data
  - "tabs" typically have smaller titles than an accordion, usually one or two words

## Functional Requirements

- You must have a Tabs component called from your App.jsx file
  - You may choose to have additional components

The Tabs component:
- Shows a row or column of titles
- Each title is a clickable element, with mouse or keyboard
- The first tab is selected by default until the user selects a different tab
- Shows a single content area below/beside the tabs
- The content area shows the content matching the most recent title
  - You can choose to render/not render the content based on the selected tab
    - Hint: One good way to do this is to have a TabContent component and pass it the content for the selected tab.  When the selected tab changes, you will pass it different content.
  - Or you can chose to render the content for all tabs and hide all but the selected tab content with CSS
    - Hint: You can look at how the accordion sample to show/hide the expanded/collapsed element

## Visual Requirements
- The currently selected tab is visibly different from the others
  - Hint, apply a class like "active" or "selected" (or their BEM equivalent states) to the selected tab
- The content should have some spacing around the Tab component, and whitespace around content
- The content should be different for each tab so we can tell the content is changed when a different tab is selected
- The tabs and content should have visible borders
  - avoid having any "double" borders where two borders would touch

## Restrictions
- Follow the best practices as described in classes
- Do not use table, CSS table-cell, floats, or other related concepts for layout
- Do not use outside JS or CSS libraries 
- Follow the methods used in class or described in this README

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'react-tabs' (`git checkout -b react-tabs`)
* add the necessary files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and myself reviewer(s)

