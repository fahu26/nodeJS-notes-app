//const fs = require("fs"); //add core node modules
//fs.writeFileSync("notes.txt","My name is Fahim");
//fs.appendFileSync("notes.txt",". I am learning nodeJS");
/*
const add = require("./util.js")
const sum = add(3,5)
console.log(sum)
*/
const chalk = require("chalk")
const validator = require("validator")
const yargs = require("yargs")
const notes = require("./notes.js")

/*const msg = getNotes()
console.log(msg)

console.log(validator.isEmail('foo122.ab@bar.com'))
console.log(validator.isEmpty('foo122.ab@bar.com'))

console.log(chalk.green.bold("Success"))
console.log(chalk.red.bold("Error"))
console.log(chalk.bgBlueBright.bold("Info"))
console.log(chalk.green.inverse.italic("Success"))*/

/*console.log(process.argv[2])
console.log(yargs.argv)*/

/*yargs.command(
    'add',
    'Adding a new note',
    function(argv){
        title: {

        }
    },
    function(argv){
        console.log("Adding a new note!!!!")
    }
)
*/
yargs.command({
    command: 'add',
    describe: 'Adding a new note!!',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: 'true',
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: 'true',
            type: 'string'
        }
    },
    // handler: function(argv){
    //     notes.addNotes(argv.title,argv.body)
    // }
    handler(argv){
        notes.addNotes(argv.title,argv.body)
    }   
})

yargs.command(
    'remove',
    'Removing a note',
//     function(yargs){
//       return yargs.option('u',{
//       title:{
//             describe:'removing a note',
//             demandOption: 'true'
//         }
//     })
// },
//     function(argv){
//         notes.removeNote(argv.title)
//     }

(yargs) =>{
    return yargs.option('u',{
    title:{
          describe:'removing a note',
          demandOption: 'true'
      }
  })
},
  (argv) => notes.removeNote(argv.title)



)

// yargs.command(
//     'list',
//     'Listing note',
//     function(argv){
//         console.log("Listing note!!!!")
//     }
// )

yargs.command({
    command: 'list',
    describe: 'Listing note',
    handler(){
        notes.listNotes()
    }
}
)


// yargs.command(
//     'read',
//     'Reading a note',
//     function(argv){
//         console.log("Reading a note!!!!")
//     }
// )

yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: 'true',
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})

yargs.parse();