const fs = require('fs')
const yargs = require('yargs')

const notes = require('./notes')
let note = {}

const argTitle = {
    title: {
        describe: 'Title of Note',
        demand: true,
        alias: 't'
    }
}

const argBody = {
    body: {
        describe: 'Note body text',
        demand: true,
        alias: 'b'
    }
}

const { _:[command], title, body } = yargs
    .command ('add', 'Add a Note', {...argTitle, ...argBody})
    .command ('list', 'List all Notes')
    .command ('read', 'Fetch a Note', argTitle)
    .command ('remove', 'Remove a Note', argTitle)
    .demandCommand()
    .help().alias ('help', 'h')
    .argv

switch (command) {
    case 'add' :
        note = notes.addNote (title, body)
        if (note) console.log ('Added Note %o', note)
        else console.log ('Note not added - Duplicate Note')
        break
    case 'list' :
        const count = notes.getAll()
        if (count) console.log (`Listed ${count} notes`)
        else console.log ('No Notes to list')
        break
    case 'read' :
        note = notes.getNote (title)
        if (note) console.log ('Found Note %o', note)
        else console.log ('Note not found')
        break
    case 'remove' :
        note = notes.removeNote (title)
        if (note) console.log ('Removed Note %o', note)
        else console.log ('Note not found')
        break
    default : console.log ('Unknown command. Use -h for help')
}
