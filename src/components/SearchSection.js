const SearchSection = ({getWeatherDetails}) => {
  const API_KEY = 'b8eb2bec5d8042b3a5645437240811'; // API Key 

  // Handles City Search Form Submission
  const handleCitySearch = (e) => {
    // e.preventDefault(); // Prevent the form from submitting
    const searchInput = e.target.querySelector('.search-input');
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
    getWeatherDetails(API_URL); // Fetches weather details for the entered city
  }

  return (
    <div className='search-section'>
        <form action="" className='search-form' onSubmit={handleCitySearch}>
            <span className="material-symbols-outlined">search</span>
            <input type='search' className='search-input' placeholder='Enter a city name'/>
        </form>
        <button className='location-button'>
            <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>
  );
}

export default SearchSection;