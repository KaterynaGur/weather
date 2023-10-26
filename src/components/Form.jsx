import { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';



export const Form = ({ setWeatherDay, setWeatherHours}) => {

   const [ input, setInput ] = useState('');
   const alert = useContext(AlertContext);
   const API_KEY = process.env.REACT_APP_API_KEY;

   const saveCoordinatesToLocalStorage = (lat, lon) => {
      const coordinates = { lat, lon };
      localStorage.setItem('selectedCoordinates', JSON.stringify(coordinates));
   }

   const formHandler = (e) => {
      e.preventDefault();
      
      console.log(input)
      if (input.trim() === '') {
         alert.show('Enter city name', 'info');
         return;
      } 
      
      fetchWeatherData1(input.trim());
   }
   
   async function fetchWeatherData1(input) {
      try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`)
         if (!response.ok) {
            return response.json().then(errorData => {
               throw new Error(errorData.message || 'Server Error');
            });
         }
         const data = await response.json();
         console.log(data)
         setWeatherDay({ 
            name: data.name,
            country: data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon,
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility,
            description: data.weather[0].description,
            wind_deg: data.wind.deg,
            wind_speed: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            main: data.weather[0].main,
            date: data.dt,
         });
         saveCoordinatesToLocalStorage(data.coord.lat, data.coord.lon);
         setInput('');
         const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`)
         const data2 = await response2.json();
         console.log(data2)
         setWeatherHours(data2.list);
        
      }
      catch(error) {
         alert.show(error.message, 'error');
      }
    }

   return (
      <div>
         <form onSubmit={formHandler} className="flex items-center justify-between">
            <div className='w-[80%]'>
               <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  name="city"
                  className="myInput py-2 w-full bg-transparent placeholder:text-white outline-none text-white focus:border-b-2"
                  type="text"
                  placeholder="Enter city name..."
               />
            </div>
            <button 
               type="submit" 
               className="relative text-white bg-white/[.10] rounded-full w-[40px] h-[40px]"
            >
               <span className='absolute top-[50%] translate-y-[-50%] w-[16px] h-[16px] absolute left-3'>
                  <img src="img/search-1.svg" alt="" />
               </span>
            </button>
         </form>
        
      </div>
   );
}
