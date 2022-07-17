const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { savedNotes } = require("../../db/notes.json");


router.get('/notes', (req, res) => {
    let results = savedNotes;
    res.json(results);
});


router.post('/notes', (req, res) => {
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, savedNotes);
        
        res.json(note);
    };
});


router.delete(`/notes/:id`, (req, res) => {
    let id = req.params.id;
    deleteNote(id, savedNotes);
    res.json(req.body);
});




//functions
function createNewNote(body, savedNotesArr) {
    const note = body;
    const newNoteId = (note.id.replaceAll(" ","")) + (savedNotesArr.length.toString());
    note.id = newNoteId;
    
    savedNotesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ savedNotes: savedNotesArr }, null, 2)
    );
    return note;
};





function deleteNote(id, savedNotesArr) {
    let ids = savedNotes.map(element => {
        return element.id
    })
    let index = ids.indexOf(id)
    savedNotesArr.splice(index, 1)
    fs.writeFileSync(
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ savedNotes: savedNotesArr }, null, 2)
    );
}





function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    return true;
};




module.exports = router;