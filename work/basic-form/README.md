# Assignment - Basic Form

**Due: Thu Sep 30, 11:59pm PT** 

# Goal

You will create an HTML page and matching CSS file that can be served using `npx serve` in this directory.

You should include at least one fake menu on the page to simulate being a page that is part of an entire site.  Style that menu as you like, per the best practices from class.

The form should have these visual and functional parts:
- Form should submit as POST (we don't have a url to actually submit to, that's fine)
- Collect a user's name (as field "name")
- Collect a user's email (as field "email")
- A checkbox for "Do you want us to send you annoying emails?" (as field "annoy_me")
- A drop down offering the options of "Silver Tier", "Gold Tier", or "Platinum Tier" (the data sent is "1", "2", or "3" respectively, as field name "tier")
  - The form will default to having none of these selected, and instead an option with an empty value and the option of "Please select" will be selected by default

The name, email, and dropdown fields are required.  The form should visually indicate the fields are required before any fields are filled in.

The form should be in a one-column layout, with the field labels visually above the fields themselves.  Layout should be done with grid, flexbox, or any combination, but should not use table, CSS table-cell displays, nor floats.

Do not use transitions, animations, or other effects not yet covered in class. (soon!)

# Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'basic-forms' (`git checkout -b basic-forms`)
* add the necessary files in this directory (or a subdirectory) to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and myself reviewer(s)

# Requirements

- Do not use transitions, animations, or other effects not yet covered in class
- Do not use table, CSS table-cell, floats, or other related concepts for layout
- use rem-based values for padding/margin
- You are not yet expected to have layouts that work well at mobile dimensions
- You ARE expected to have a layout that will work at a range of desktop sizes
- Your HTML should be semantic
- Your CSS should be semantic

