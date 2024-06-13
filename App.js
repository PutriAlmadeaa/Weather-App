import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL, API_KEY } from './src/constant'
import { View, StyleSheet } from 'react-native'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'

const App = () => {
  const[weatherData, setweatherData] = useState()

  const searchWeather = (location) =>{
    const url = `${BASE_URL}?q=${location}&appid=${API_KEY}`
    console.log(`Request URL: ${url}`)

    axios
    .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
    .then((response)=>{
      const data = response.data
      data.visibility /= 1000
      data.visibility = data.visibility.toFixed(2)
      data.main.temp -= 273.15 
      data.main.temp = data.main.temp.toFixed(2)
      setweatherData(data)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather} />
      {/* Tampilkan data cuaca ketika ada weatherData */}
      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

export default App