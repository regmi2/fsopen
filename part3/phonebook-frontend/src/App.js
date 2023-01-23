import React from 'react'
import Person from './components/Person'
import { useState, useEffect } from 'react'
import dbComm from './services/backend_comm'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  //ADD PERSONS FROM DB.JSON INTO PERSONS ARRAY STATE
  useEffect(() => {
    dbComm
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])





//adding person 
  const addPerson = (event)  => {
    event.preventDefault()
    const found = persons.some(person => person.name === newName)

    //if the person exists in phone book, prevent them from
    //being added
    if(found){
      const foundPerson = persons.find(p => p.name === newName)

      if(newNumber === foundPerson.number){
        alert(`${newName} is already in phonebook with number ${newNumber}`)
        return
      }
      else if(window.confirm
        (`${newName} is already added to phonebook, replace the old number with a new one?`))
        {

        const changedNumberPerson = { ...foundPerson, number: newNumber }

        dbComm
        .update(foundPerson.id, changedNumberPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson))
          setMessage(`SUCCESS: ${changedNumberPerson.name}'s phone number was updated to ${changedNumberPerson.number}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`ERROR: the person ${newName} does not exist on the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setPersons(persons.filter(p => p.id !== foundPerson.id))
        })
      } else {
        return
      }
    }

    //new person object 
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    //using service to create a new person within the 
    //db and update persons array state
    dbComm.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage(`SUCCESS: ${newPerson.name} was successfully added to the phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }).catch(error => {
      setMessage(`ERROR: ${newPerson.name} could not be added. Try again`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })

  }

  //delete person method
  const deletePerson = id => {
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Delete ${person.name} ?`)){
      dbComm
      .dbDelete(id)
      .then(
        returnedData => {
          setMessage(`SUCCESS: ${person.name} was successfully deleted from the phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      ).catch(error => {
        setMessage(`ERROR: the person ${newName} does not exist on the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
      })

      setPersons(persons.filter(person => person.id !== id))
    }
  }


  //handler functions that take in input
  //and call callback functions to update states
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    event.preventDefault()
    setNewSearch(event.target.value)
  }


  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
  
        <div>

          filter shown with <input 
          type="text" placeholder="search" 
          value={newSearch} 
          onChange={handleFilter}/>

        </div>

       
      <h2>add a new</h2>
 
      <form id="addPersonForm" onSubmit={addPerson}>

        <div id="name-form">
          name: <input value={newName} onChange={handleNameAdd} />
        </div>

        <div id="number-form">
          number: <input value={newNumber} onChange={handleNumberAdd} />
        </div>

       
        <div id="add-button">
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
        <div>

          <div className="filter">

            {persons.filter((person) => {
              if(newSearch==='') return person
              else if(person.name.toLowerCase().includes(newSearch.toLowerCase())) return person
              else{ return person }
            }).map((person) => (
            
            <Person 
                key={person.id} 
                person={person}
                deletePerson={() => deletePerson(person.id)}
                />
              
            ))         
            }
          </div>

        </div>
    </div>
  )
}

export default App