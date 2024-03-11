const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid')
const note = require('../db/db.json')

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

notes.delete('/:id', (req, res) => {
    const noteToDelete = req.params.id;
    const updatedNotes = note.filter(
        (note) => note.id !== noteToDelete);
    if (updatedNotes.length < note.length) {
        writeToFile('./db/db.json', updatedNotes)
        .then(() => {
            res.status(200).json({ msg: 'Note deleted successfully' })
        })
        .catch((error) => {
            console.error('Error saving updated notes to db.json', error)
            res.status(500).json({ msg: 'Error' });
        });
    } else {
        res.status(404).json({ msg: 'Note not found.' });
    }
});

module.exports = notes;