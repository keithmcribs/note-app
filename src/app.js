const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes.js');
const yargs = require('yargs');

var cmd = process.argv[2];
const argv = yargs
    .command('add', 'add a new note', {
        title:{
            describe: 'Title of note',
            demand: true,
            alias: 't'            
        },
        body:{
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('remove', 'remove a note', {
        title:{
            describe: 'Title of note to be removed',
            demand: true,
            alias: 't'
        }
    })
    .command('list', 'list all notes')
    .command('read', 'read a note', {
        title:{
            describe: 'Title of note to be read',
            demand: true,
            alias: 't'
        }
    })
    .help()
    .argv;
console.log('Command: ', cmd);
// console.log('Yargs: ', argv);

switch(cmd){
    case "add": 
        var note = notes.addNote(argv.title, argv.body); 
        if(note){
            console.log("----");
            console.log(`Title: ${note.title}`);
            console.log(`Body: ${note.body}`);
            console.log("Note has been saved");
        } else {
            console.log("----");
            console.log("Note title taken");
        }
        break;
    case "remove": 
        var removed = notes.removeNote(argv.title); 
        var message = removed ? 'Note was removed':'Note not found';
        console.log("----");
        console.log(message);
        break;
    case "list": 
        var list = notes.getAll(); 
        if(list.length == 0){
            console.log("----");
            console.log("No note found");
        }
        break;
    case "read": 
        var note = notes.readNote(argv.title); 
        if(note){
            console.log("----");
            console.log(`Title: ${note.title}`);
            console.log(`Body: ${note.body}`);
        } else {
            console.log("----");
            console.log("Note not found");
        }
        break;
    default: console.log("Command not recognized")
}


