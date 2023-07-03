const ChooseCountry = ({countries, setFilterText}) => {
    return (
        <div>{countries.map(country =>
            <div className='countries'>
            <p key={country.name.common}> {country.name.common} </p>
            <button onClick={() => setFilterText(country.name.common)}>show</button>
            </div>
        )}
        </div>
    )
}

export default ChooseCountry