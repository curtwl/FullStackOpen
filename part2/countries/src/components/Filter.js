const Filter = (props) =>
    <div className="filter">
    <p>find countries: <input type='text' value={props.filterText} onChange={props.onChange} /></p>
    </div>

export default Filter