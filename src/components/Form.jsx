import { useState, useEffect, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';



export const Form = ({weatherHours, weatherDay, API_KEY, setWeatherDay, setWeatherHours, firstRequestCompleted, setFirstRequestCompleted}) => {

   const [ input, setInput ] = useState('');
   const alert = useContext(AlertContext);

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
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.trim()}&units=metric&appid=${API_KEY}`)
         .then(response => {
            if (!response.ok) {
               return response.json().then(errorData => {
                  throw new Error(errorData.message || 'Server Error');
               });
            }
            return response.json();
         })
        .then(data => {
            console.log('первый запрос: ', data);
            if(data.length === 0) return 
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
            setFirstRequestCompleted(true);
            setInput('');
            
        })
        .catch(error => {
         alert.show(error.message, 'error');
      });
   }
   
   
   useEffect(() => {
      if (firstRequestCompleted) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherDay.lat}&lon=${weatherDay.lon}&units=metric&appid=${API_KEY}`)
          .then(response => response.json())
          .then(data => {
            console.log('второй запрос: ', data)
            setWeatherHours(data.list);
            setFirstRequestCompleted(false);
         });
      }
    }, [firstRequestCompleted, weatherDay.lat, weatherDay.lon, API_KEY]);
   
   
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