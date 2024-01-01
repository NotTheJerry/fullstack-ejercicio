import React, { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsServices from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumero, setNewNumero ] = useState('')
  const [filtro, setFiltro] = useState('')
  const [message, setMessage] = useState('')
  const [className, setClassName] = useState('')

  const hook = () => {
    personsServices.getAll()
    .then(response => setPersons(response))
  }

  useEffect(hook, [])

  const agregarPersona = (event) => {
    event.preventDefault()
    const nuevaPersona = {
      name: newName,
      number: newNumero
    }

    const person = persons.find(person => person.name === newName)

    if(person){
      if(window.confirm(`Do you want to update de contact "${person.name}"?`)){
        personsServices.actualizarPersona(person.id, nuevaPersona)
        .then(updatedPerson => {
          setPersons(persons.map(per => per.id !== updatedPerson.id ? per : updatedPerson))
          setClassName('message')
          setMessage(`${person.name} contact was successfully updated`)
        })
        .catch(error => {
          setClassName('error')
          setMessage(error.response.data.error)
        })
        setTimeout(() => setMessage(null), 5000)
        setNewName('')
        setNewNumero('')
      }
    }
    else {
      personsServices.createPerson(nuevaPersona)
      .then(nuevaPersona => {
        setPersons(persons.concat(nuevaPersona))
        setClassName('message')
        setMessage(`${newName} was succesfully added to your contacts`)
      })
      .catch(error => {
        setClassName('error')
        setMessage(error.response.data.error)
      })
      setTimeout(() => setMessage(null), 5000)
      setNewName('')
      setNewNumero('')
    }
    
  }

  const toogleDelete = (id, name) => {
    if(window.confirm(`Do you want to the delete the contact "${name}"?`)){
      personsServices.deletePerson(id).then(r => r.data).catch(error => { setClassName('error'); setMessage(`Information of ${name} has already been removed from the server`)})
      setTimeout(() => setMessage(''), 5000)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNuevoNombre = (event) => {
    setNewName(event.target.value)
  }

  const handleNuevoNumero = (event) => {
    setNewNumero(event.target.value)
  }

  const handleFiltro = (event) => {
    setFiltro(event.target.value)
  }

  const personsFiltrated = persons.filter(person => person.name.toUpperCase() === filtro.toUpperCase())
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={className}/>
      <Filter filtro={filtro} handleFiltro={handleFiltro} personsFiltrated={personsFiltrated}/>
      <h2>add a new</h2>
      <PersonForm agregarPersona={agregarPersona} 
      newName={newName} handleNuevoNombre={handleNuevoNombre} 
      newNumero={newNumero} handleNuevoNumero={handleNuevoNumero}
      />
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} toogleDelete={() => toogleDelete(person.id, person.name)}/>)}
    </div>
  )
}

export default App