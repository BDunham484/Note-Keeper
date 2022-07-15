const fs = require('fs');
const path = require('path');
//import exress.js
const express = require('express');
//require data
const { savedNotes } = require("./db/notes.json");
const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming json data
app.use(express.json());











//route for notes db
app.get('/db/notes', (req, res) => {
    let results = savedNotes;
    // console.log(req.query);
    res.json(results);
});





app.post('/db/notes', (req, res) => {
    // console.log(req.body);
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, savedNotes);

        res.json(note);
    }

    
});





function createNewNote(body, savedNotesArr) {
    const note = body;

    savedNotesArr.push(note)

    fs.writeFileSync(
        path.join(__dirname, './db/notes.json'),
        JSON.stringify({ note: savedNotesArr }, null, 2)
    );

    return note;
}





function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    return true;
}





//tell server to listen to port 3001 via the listen() method
app.listen(PORT, () => {
    console.log(`Note server now on port ${PORT}!`);
});