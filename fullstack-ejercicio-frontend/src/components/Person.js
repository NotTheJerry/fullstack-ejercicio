const Person = ({name, number, toogleDelete}) => {
    return (
        <div> 
            <div>{name} {number} <button onClick={toogleDelete}>delete</button></div>
        </div>
        
    )
}

export default  Person