// import router and note data
const router = require('express').Router();
const database = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// create route to get all saved notes
router.get('/notes', (req, res) => {
    const results = database;
    res.json(results);
});

// create route to post a note
router.post('/notes', (req, res) => {
    // create unique id for new note
    req.body.id = uuidv4();

    const createNote = (data, dbArray) => {
        const database = dbArray;
        database.push(data);
        // add new note to database
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(dbArray, null, 2)
        );
        return database;
    };

    const note = createNote(req.body, database);
    res.json(note);
});

// create route to delete a note (optional)
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const noteToDelete = database.find(data => data.id == id);
    const noteIndex = database.indexOf(noteToDelete);

    database.splice(noteIndex, 1);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(database, null, 2)
    );
    res.status(204).send('Note deleted');
});

module.exports = router;