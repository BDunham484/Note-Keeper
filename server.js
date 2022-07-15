//import exress.js
const express = require('express');
//require data
const { savedNotes } = require("./db/notes.json");

//instantiate the server
const app = express();











//route for notes db
app.get('/db/notes', (req, res) => {
    let results = savedNotes;
    console.log(req.query);
    res.json(results);
});





//tell server to listen to port 3001 via the listen() method
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});