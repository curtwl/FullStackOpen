const PersonForm = (props) =>
  <form onSubmit={props.onSubmit}>
    <div>
      name: <input type='text' name="newName" value={props.newName} onChange={props.onChangeName} />
      <div>
        number: <input type='text' name="newNumber" value={props.newNumber} onChange={props.onChangeNumber} /></div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

  export default PersonForm