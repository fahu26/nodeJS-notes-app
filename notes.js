const fs = require("fs")
const chalk = require("chalk")

const addNotes = (title,body) =>{
    const notes = loadNotes()
   // const duplicateNotes = notes.filter((note) => note.title === title)
   //  if(duplicateNotes.length ===0){

    const duplicateNote  = notes.find((note) => note.title === title)
  if(!duplicateNote){  
  notes.push({
        title: title,
        body: body
    })

    saveNote(notes)
    console.log(chalk.bgGreen("Note added Successfully!!!"))

}
else{
    console.log(chalk.bgRed("Title already taken"))
}
}

const removeNote = (title) =>{
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notesToKeep.length !== notes.length){
        saveNote(notesToKeep)
    console.log(chalk.bgGreen("Note removed"))
    }
    else{
        console.log(chalk.bgRed("No note removed"))    
    }

}
const saveNote = (note) =>{
    const jsonData = JSON.stringify(note)
    fs.writeFileSync("notes.json",jsonData)
}

const loadNotes = () =>{
    try{
    const bufferedData = fs.readFileSync("notes.json")
    const jsonData = bufferedData.toString()
    return JSON.parse(jsonData)
    }
    catch(e){
        return []
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.yellow("Your notes"))
    const titleName = notes.filter((note) => console.log(chalk.green("Title: "+note.title)))
}

const readNotes =(title) =>{
    const notes = loadNotes()
    
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green("Title: "+note.title))
        console.log("Body: "+note.body)
    }
    else{
        console.log(chalk.red("No Note found"))
    }
}
module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}