const Filter = ({filtro, handleFiltro, personsFiltrated}) => {
    return (
        <>
            <div>filter shown with <input value={filtro} onChange={handleFiltro}/> </div>
            <div> {personsFiltrated.map(person => <div key={person.number}>{person.name} {person.number}</div> )} </div>
        </>
    )
}


export default Filter