const router = require('express').Router();
const { createNewNote, deleteNote } = require('../../lib/notes')
const { savedNotes } = require("../../db/notes.json");

const fs = require('fs');
const path = require('path');




router.get('/notes', (req, res) => {
    let results = savedNotes;
    res.json(results);
});


router.post('/notes', (req, res) => {
    const note = createNewNote(req.body, savedNotes);
    res.json(note);
});


router.delete(`/notes/:id`, (req, res) => {
    let id = req.params.id;
    let ids = savedNotes.map(element => {
        return element.id
    })
    let index = ids.indexOf(id)
    savedNotes.splice(index, 1)
    // test = savedNotes.filter(x => x.id !== id);

    fs.writeFileSync(
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ savedNotes: savedNotes }, null, 2)
    );
    res.json(req.body);
});



module.exports = router;