const router = require('express').Router();

// Import modular router for /notes
const notesRouter = require('./notes')

router.use('/notes', notesRouter)

module.exports = router;

// Even though I currently only have one router, the current file structure makes this project easier to expand upon in the future