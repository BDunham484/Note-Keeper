//import exress.js
const express = require('express');
//require data
const { savedNotes } = require("./db/notes.json");
const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();











//route for notes db
app.get('/db/notes', (req, res) => {
    let results = savedNotes;
    console.log(req.query);
    res.json(results);
});





//tell server to listen to port 3001 via the listen() method
app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});