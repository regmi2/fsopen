const Notification = ({ message}) => {
    if (message === null) {
      return null
    }
  
    if (message.includes('ERROR')){
        return (
            <div style={error} className='error'>
              {message}
            </div>
          )

    } else if(message.includes('SUCCESS')){

            return (
                <div style={success} className='success'>
                  {message}
                </div>
              )
    

    }

    return ''
  }




  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const error =  {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  export default Notification