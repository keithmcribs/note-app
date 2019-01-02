const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('note-data.json');
        return JSON.parse(notesString);   
    } catch(err) { 
        console.log(err);
        return []; 
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
};

function addNote(title, body){
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => 
        note.title === title
    );

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

function removeNote(title){  
    var notes = fetchNotes();  
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
}

function getAll(){
    var notes = fetchNotes();
    console.log('----');
    var counter = 1;
    notes.forEach((note) => {
        console.log(`- Note ${counter}`)
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
        counter++;
    });
    return notes.length;
}

function readNote(title){
    var notes = fetchNotes();
    for(var i = 0; i < notes.length; i++){
        if(notes[i].title == title){
            return notes[i];
        }
    }
}

module.exports = {
    addNote,
    removeNote,
    getAll,
    readNote
}