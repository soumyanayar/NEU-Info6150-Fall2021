# Services JS Assignment

** Due 11:59pm PT Thu Oct 21  **

## Goal

- Create an index.html 
- Create a services.js file that loads data from a REST service and populates the HTML
- Create a services.css file that styles the resulting HTML

## Functional Requirements

- Your index.html will have an empty `<ul class="posts"></ul>`
- On page load, do a fetch() GET call to the below service:
  - https://jsonplaceholder.typicode.com/posts
- Use the returned JSON array to populate the ul with posts
  - Note the data represents fake posts, the text is just nonsense lorem ipsum
  - Style the page appropriately so that the posts resemble "real" forum posts
    - So you can recognize distinct posts as distinct, their title and body are shown
      - If you want to use `text-overflow: ellipsis;` (https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow ) to show a truncated version of the body, you can
    - Generally you have a lot of freedom to style this as you like - the important parts are that the data is loaded dynamically, and the below behavior
- Make the title of each post you show a link, except instead of navigating, the comments for the post are shown
  - Remember to make parts show/not show by using classes the JS changes
  - clicking on a link will make another fetch() call to get the comments for this post
  - The url to fetch is below, except you want to have whatever the post id is instead of `1`
    - https://jsonplaceholder.typicode.com/posts/1/comments
  - Style the page appopriately so that the post and comments resemble "real" forum posts
  - If a different post is selected, that post will expand to show comments and this post will stop showing comments
- You should consider how you would show errors, but you do not need to show errors for this assignment

## Submission Instructions

* start from the up-to-date main branch (`git checkout main; git pull origin main`)
* Create a feature branch named 'services-js' (`git checkout -b services-js`)
* add the necessary files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to main
* Be sure to include the TA(s) and myself reviewer(s)

## Restrictions

- Do not use table, CSS table-cell, floats, or other related concepts for layout
- use rem-based values for padding/margin
- Do not use outside JS or CSS libraries 

