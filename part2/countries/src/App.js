import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

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
    setFilterText(event.target.value)
  }
  
  const countriesFiltered = countryList.filter(country => typeof(country.name.common) === 'string')
    .filter(country =>
    (country.name.common.toLowerCase()
      .includes(filterText.toLowerCase())))
  return (
    <div>
      <Filter value={filterText} onChange={handleFilter}/>
      <Countries countriesFiltered={countriesFiltered} filterText={filterText} setFilterText={setFilterText}/>
    </div>
  )
}

export default App