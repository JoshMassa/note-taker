const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const note = require('../db/db.json')

// API GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    const noteIdToRetrieve = req.query.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ msg: 'Error reading notes' });
            return;
        }

        const notesData = JSON.parse(data);

        if (noteIdToRetrieve) {
            // If ID parameter is provided, find and return the specific note
            const selectedNote = notesData.find((note) => note.id === noteIdToRetrieve);

            if (selectedNote) {
                res.json(selectedNote);
            } else {
                res.status(404).json({ msg: 'Note not found.' });
            }
        } else {
            // If no ID parameter is provided, return all notes
            res.json(notesData);
        }
    });
});

// API POST Route for adding new notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json('Error adding new note');
                return;
            }
            const notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4), (err) => {
                if (err) {
                    console.error('Error saving updated notes to db.json', err);
                    res.status(500).json('Error adding new note');
                } else {
                    console.info('Note added successfully');
                    res.json(`Note added successfully`);
                }
            });
        });
    } else {
        res.status(500).json('Error adding new note');
    }
});

// API DELETE Route for deleting notes
notes.delete('/:id', (req, res) => {
    const noteToDelete = req.query.id;
    const updatedNotes = note.filter(
        (note) => note.id !== noteToDelete);
    fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 4), (err) => {
        if (err) {
            console.error('Error saving updated notes to db.json', err);
            res.status(500).json({ msg: 'Error' });
            return;
        }
        res.status(200).json({ msg: 'Note deleted successfully' });
    });
});

module.exports = notes;