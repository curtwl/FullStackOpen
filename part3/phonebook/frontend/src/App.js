import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
//import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [responseMessageState, setResponseMessageState] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(intialPeople => {
        console.log('promise fulfilled')
        setPersons(intialPeople)
      })
      .catch(error => console.log(error))

  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      alert('must fill in name and number')
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
      //id: uuidv4()
    }

    // UPDATE existing number?
    const personFound = persons.find(e => e.name === personObject.name)
    const updatedPerson = { ...personFound, number: newNumber }

    if (personFound) {
      if (window.confirm(`${personFound.name} has already been added to the phonebook, replace num?`)) {
        personsService
          .update(personFound.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personFound.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            event.target[0].value = ''
            event.target[1].value = ''
            handleResponseMessage(`Number for '${personFound.name}' has been updated`, 'success')
          })
          .catch(error => {
            handleResponseMessage(error.response.data.error, 'error')
          })
      }
    }

    // CREATE new entry if name not found
    if (!personFound) {
      personsService
        .create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          event.target[0].value = ''
          event.target[1].value = ''
          handleResponseMessage(`Number for '${personObject.name}' has been added`, 'success')
        })
        .catch(error => { 
          //console.log(error.response)
          handleResponseMessage(error.response.data.error, 'error')
        })
    }
  }

  // handlers
  const handleResponseMessage = (responseText, responseState) => {
    setResponseMessage(responseText)
    setResponseMessageState(responseState)
    setTimeout(() => {
      setResponseMessageState(null)
    }, 5000)
  }

  const handleChange = (event, setter) => {
    setter(event.target.value)
  }

  const handleDelete = (id) => {
    const nameToDelete = persons.find(e => e.id === id)

    if (window.confirm(`Delete ${nameToDelete.name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          handleResponseMessage(`Number for '${nameToDelete.name}' has been deleted`, 'success')
        })
        .catch(error => console.log(error))
    }
  }

  // populate list of names and numbers, optionally filtered
  const peopleElements = persons.filter(person =>
  (person.name.toLowerCase()
    .includes(filterText.toLowerCase())))
    .map(person =>
      <div className='people'>
        <p key={person.id}> {person.name} &nbsp; <span className='one-number'> {person.number} </span></p>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </div>
    )

  return (
    <div className='container'>
      <div className='header'>
        <h1>Phonebook</h1>
        <Notification 
          message={responseMessage} 
          responseMessageState={responseMessageState} />
        <Filter 
          value={filterText} 
          onChange={event => handleChange(event, setFilterText)} />
        </div>
      <div className='add-form'>
        <h3>Add Contact</h3>
        <PersonForm 
          onSubmit={addPerson}
          valueName={newName} 
          valueNumber={newNumber}
          onChangeName={event => handleChange(event, setNewName)} 
          onChangeNumber={event => handleChange(event, setNewNumber)}
        />
      </div>
      <div className='numbers'>
        <h3>Numbers</h3>
        {/* <Filter 
          value={filterText} 
          onChange={event => handleChange(event, setFilterText)} /> */}
        <Persons people={peopleElements} />
      </div>
    </div>
  )
}

export default App