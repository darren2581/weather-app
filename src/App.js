import './App.css';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HoursWeatherItem from './components/HourlyWeatherItem';
import SearchSection from './components/SearchSection';
import { weatherCodes } from './constants';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

    // Filters the hourly data for the next 24 hours
    const next24HoursData = hourlyData.filter(({time}) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    })

    setHourlyForecasts(next24HoursData);
  }

  // Fetches weather details based on API URL
  const getWeatherDetails = async (API_URL) => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();

      // Extracts the temperature, description, and weather icon
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code));

      setCurrentWeather({temperature, description, weatherIcon});

      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
      filterHourlyForecast(combinedHourlyData);
    }catch (error){
      console.log(error);
    }
  }

  return (
    <div className='container'>
      {/* Search Section */}
      <SearchSection getWeatherDetails={getWeatherDetails}/>

      {/* Weather Section */} 
      <div className='weather-section'>
        {/* Current Weather */}
        <CurrentWeather currentWeather={currentWeather}/>

        {/* Hourly Weather Forecast List */}
        <div className='hourly-forecast'>
          <ul className='weather-list'>
            {hourlyForecasts.map((hourlyWeather) => ( // .map is to iterate through the hourlyForecasts array
              <HoursWeatherItem key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather}/>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
