const Filter = (props) =>
  <p className="filter">Filter: <input type='text' name="filter" value={props.filterText} onChange={props.onChange} /></p>

export default Filter