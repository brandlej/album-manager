# Album Manager

A small web application to handle managing a collection of albums. Allows for easy ability to view albums, edit an album's fields, and more. 

## Dependencies
* [NPM](https://www.npmjs.com/)


## Installation

First you'll need to install all of the dependencies. Run below
```
npm install
```

## How to Use
Run the following to spin up a local dev server, then go to `http://localhost:3000/` to use the application! This will run the client code and kick off a local server.
```
npm run dev
```

## Running Tests
Run the following to run test suites
```
npm test
```

## Development
Local express server is run on port 5000. Changes are automatically watched and built using nodemon. Client code is served on port 3000 with changes also reloading on save.

## General Usage
Greg's albums are fetched and displayed when the app loads. These get paginated and you can switch to the other page at the bottom of the page below the results. You can click on an album result to open the editing pane. From there you can edit all the fields of the album. To exit the editing pane, you can either hit the 'x' button or hit the escape key. There's also a search bar at the top of the app where you can filter down results. These search based on the different fields of the album.