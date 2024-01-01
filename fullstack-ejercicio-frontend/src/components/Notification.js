const Notification = ({message, className}) => {
    if(message) {
        return (
            <div className={className}>
                {message}
            </div>
        )
    }
}

export default Notification