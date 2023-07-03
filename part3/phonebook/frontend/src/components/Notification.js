// const Notification = ({ message, responseMessageState }) => {
//     if (responseMessageState === null) {
//       return null
//     }
//     else if (responseMessageState === 'success') {
//       return (
//         <div className='success'>
//           {message}
//         </div>
//       )
//     }
  
//     return (
//       <div className='error'>
//         {message}
//       </div>
//     )
//   }
const Notification = ({ message, responseMessageState }) => {
  if (responseMessageState === null) {
    // When there's no message, render an empty div to take up space
    return <div className='notification-placeholder'></div>
  }
  else if (responseMessageState === 'success') {
    // When the message is a success message, render the success div
    return <div className='success'>{message}</div>
  }
  else {
    // When the message is an error message, render the error div
    return <div className='error'>{message}</div>
  }
}

export default Notification