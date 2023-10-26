import React, {useState, useEffect, useContext} from 'react';

import { AlertContext } from '../context/alert/alertContext';

import { Header } from '../components/Header';
import { Highlights } from '../components/Highlights';
import { Tab } from '../components/Tab';
import { WeatherMain } from '../components/WeatherMain';


export const HomePage = () => {
  
   const API_KEY = process.env.REACT_APP_API_KEY;
   const [ weatherDay, setWeatherDay ] = useState({});
   const [ weatherHours, setWeatherHours ] = useState([]);
   const [geolocationFetched, setGeolocationFetched] = useState(false);
   
   
   const alert = useContext(AlertContext);

   useEffect(() => {
      const savedCoordinates = localStorage.getItem('selectedCoordinates');
      if (!geolocationFetched && savedCoordinates) {
        const { lat, lon } = JSON.parse(savedCoordinates);
        fetchWeatherData(lat, lon);
      } else if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            setGeolocationFetched(true);
          },
          (error) => {
            fetchWeatherData(50.4333, 30.5167);
          }
        );
      } else {
         alert.show('Not found', 'error');
      }
    }, [geolocationFetched]);

    async function fetchWeatherData(lat, lon) {
      try {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
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
         <Header
            setWeatherDay={setWeatherDay}
            setWeatherHours={setWeatherHours}
         />
         <main className='main'>
            <div className='main__container'>
               <div className='left-part darkblue-part'>
                  <WeatherMain {...weatherDay} />
               </div>
               <div className='right-part lightblue-part'>
                  <Tab weatherHours={weatherHours} />
                  <Highlights weatherDay={weatherDay}/>
               </div>
            </div>
         </main>
      </div>
   );
}