const Notification = ({ message, responseMessageState }) => {
    if (responseMessageState === null) {
      return null
    }
    else if (responseMessageState === 'success') {
      return (
        <div className='success'>
          {message}
        </div>
      )
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export default Notification