import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

    const [weather, setWeather] = useState({temp: 'loading...', wind: 'loading...'})
    const api_key = process.env.REACT_APP_API_KEY
  
    useEffect(() => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&units=metric&APPID=${api_key}`)
                              .then(res => res.data)
                              .then(data => {
                                setWeather({temp: data.main.temp, wind: data.wind.speed})
                                console.log(data) 
                              })
      }, [])

    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {weather.temp} Celsius</p>
        <p>wind {weather.wind} m/s </p>
      </div>
    )
  }

  export default Weather