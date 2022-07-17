const router = require('express').Router();
const fs = require('fs');
const path = require('path');
// const { validateNote, createNewNote } = require('../../server');
const { savedNotes } = require("../../db/notes.json");



router.get('/notes', (req, res) => {
    let results = savedNotes;
    // console.log(req.query);
    res.json(results);
});





router.post('/notes', (req, res) => {
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
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ savedNotes: savedNotesArr }, null, 2)
    );

    return note;
}





function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }

    return true;
}


module.exports = router;