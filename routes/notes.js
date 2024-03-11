const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid')

// API GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.status(500).json('Error adding new note');
    }
});

module.exports = notes;