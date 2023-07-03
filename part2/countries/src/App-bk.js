import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'

const Filter = (props) =>
<p>find countries: <input type='text' value={props.filterText} onChange={props.onChange} /></p>

const Countries = ({countriesFiltered, filterText}) => {
  // if (!props.countriesFiltered)
  //  return null

  console.log(countriesFiltered.length)
  if (!filterText)
    return null
  if (countriesFiltered.length > 10)
    return (
      <p>Too many results</p>
    )
  if (countriesFiltered.length > 1) {
    const handleShow = (country) => {
      console.log(country)
    }
    return (
      <div>{countriesFiltered.map(country =>
        <div className='countries'>
          <p key={country.name.common}> {country.name.common} </p>
          
          <button onClick={() => handleShow(country)}>show</button>
        </div>
      )}</div>
    )
    }
    console.log(countriesFiltered[0].flags.png)
    const langs = Object.values(countriesFiltered[0].languages).map(lang =>
      <li>{lang}</li>
      )
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    let temp
    let wind
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countriesFiltered[0].capital},${countriesFiltered[0].cca2}&APPID=b0da690a7dca1436b76ab74072554fe3`)
                          .then(res => res.data)
                          .then(data => {
                            temp = data.main.temp
                            wind = data.wind.speed
                            console.log(temp, wind)   
                          })
    
    if (!temp || !wind)
      return null
    else
      return (
        <div>
          <h1>{countriesFiltered[0].name.common}</h1>
          <p>capital {countriesFiltered[0].capital}</p>
          <p>area {countriesFiltered[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {langs}
          </ul>
          <img src={countriesFiltered[0].flags.png}/>
          <h2>Weather in {countriesFiltered[0].capital}</h2>
          <p>temperature {temp}</p>
          <p>wind {wind}</p>
        </div>
      )
      
}

const App = () => {
  const [filterText, setFilterText] = useState('')
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => res.data)
    .then(data => {
      setCountryList(data)
    })
  }, [])

  const handleFilter = (event) => {
    console.log(filterText)
    console.log(event)
    setFilterText(event.target.value)
  }
  
  const countriesFiltered = countryList.filter(country => typeof(country.name.common) === 'string')
    .filter(country =>
    (country.name.common.toLowerCase()
      .includes(filterText.toLowerCase())))

  return (
    <div>
      <Filter value={filterText} onChange={handleFilter}/>
      <Countries countriesFiltered={countriesFiltered} filterText={filterText}/>
    </div>
  )
}

export default App
