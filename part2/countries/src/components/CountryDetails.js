import Weather from "./Weather"

const CountryDetails = ({country}) => {
    const langs = Object.values(country.languages).map(lang =>
        <li>{lang}</li>
    )
    return (
        <div className="country">
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {langs}
            </ul>
            <img src={country.flags.png}/>
            <Weather country={country} />
        </div>
    )
}

export default CountryDetails