const fs = require('fs')
const notesFile = './notes.json'

const loadNotes = () => {
    try {
        const strNotes = fs.readFileSync(notesFile)
        return JSON.parse(strNotes)
    } catch (e) { return [] }
}

const saveNotes = (notes) => fs.writeFileSync (notesFile, JSON.stringify(notes))

var getAll = () =>  {
    const notes = loadNotes()
    if (notes.length) notes.forEach (note => console.log (note))
    return notes.length
}

var getNote = (title) => {
    const notes = loadNotes()
    const note = notes.find (item => item.title === title)
    if (note) return note
}

var addNote = (title, body) => {
    const notes = loadNotes()
    const note = {title, body}
    const found = 1 + notes.findIndex (item => item.title === title)
    if (!found) {
        notes.push (note)
        saveNotes (notes)
        return note
    }
}

var removeNote = (title) => {
    const notes = loadNotes()
    const found = 1 + notes.findIndex (item => item.title === title)
    if (found) {
        const note = notes.splice (found - 1, 1)
        saveNotes (notes)
        return note[0]
    }
}

module.exports = { addNote, getAll, getNote, removeNote }