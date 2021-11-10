# ToDo list server sample

This is a server that:
- serves static files from `public/`
- offers RESTful services to interact with a set of TODO items
  - each item has:
    - a unique `id` value
    - a `task` name 
    - a `done` boolean status

You can run the sample here, or copy everything in this directory outside of your repo to experiment with it.

Remember to be careful not to make changes here that you submit with an assignment.  Either copy these files elsewhere or work in a branch that you won't be submitting work from.

## Installing dependencies

This should only have to be done once, but you can safely re-run this step if you want to.

To install the libraries this code needs, run:
- `npm install` _in this directory_ 

## Running the server

To run the server, run `node server.js` _in this directory_

You can stop the running server by entering Ctrl-C

To view the pages, go to `http://localhost:3000/` in your browser when the server is running

## Modifying the files

The files in this directory are for running the server.  The files a visitor to the website will see are all in `public/`.



