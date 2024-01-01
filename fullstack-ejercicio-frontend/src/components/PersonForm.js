const PersonForm = ({agregarPersona, newName, handleNuevoNombre, newNumero, handleNuevoNumero}) => {
  return (
      <form onSubmit={agregarPersona}>
          <div> name: <input value={newName} onChange={handleNuevoNombre}/> </div>
          <div> number: <input value={newNumero} onChange={handleNuevoNumero}/> </div>
          <div> <button type="submit">add</button> </div>
      </form>
  )
}

export default PersonForm