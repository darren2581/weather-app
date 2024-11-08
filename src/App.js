import './App.css';
import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HoursWeatherItem from './components/HourlyWeatherItem';
import SearchSection from './components/SearchSection';

function App() {
  const [currentWeather, setCurrentWeather] = useState({});

  // Fetches weather details based on API URL
  const getWeatherDetails = async (API_URL) => {
    try{
      const response = await fetch(API_URL);
      const data = await response.json();

      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;

      setCurrentWeather({temperature, description});
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
            <HoursWeatherItem />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
