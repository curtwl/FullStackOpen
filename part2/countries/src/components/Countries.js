import ChooseCountry from './ChooseCountry'
import CountryDetails from './CountryDetails'

const Countries = ({countriesFiltered, filterText, setFilterText}) => {
    console.log(countriesFiltered.length)
    if (!filterText)
      return null
    if (countriesFiltered.length > 10)
      return (
        <p>Too many results</p>
      )
    if (countriesFiltered.length > 1) {       
      return (
        <ChooseCountry countries={countriesFiltered} setFilterText={setFilterText}/>
      )
    }
    if (countriesFiltered.length === 1) {      
      return (
        <CountryDetails country={countriesFiltered[0]}/>
      )
    }
  }

  export default Countries