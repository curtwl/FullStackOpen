// ex 3.12
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameToAdd = process.argv[3]
const numberToAdd = process.argv[4]

const url =
`mongodb+srv://curtwl:${password}@cluster0.t2qalde.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: nameToAdd,
  number: numberToAdd,
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else {
  person.save().then(() => {
    console.log(`added ${nameToAdd} number ${numberToAdd} to phonebook`)
    mongoose.connection.close()
  })
}

