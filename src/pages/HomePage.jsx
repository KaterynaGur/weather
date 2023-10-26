import React, {useState, useEffect, useContext} from 'react';

import { AlertContext } from '../context/alert/alertContext';

import { Header } from '../components/Header';
import { Highlights } from '../components/Highlights';
import { Tab } from '../components/Tab';
import { WeatherMain } from '../components/WeatherMain';


export const HomePage = () => {
   const initialWeatherDay = {
      name: undefined,
      country: undefined,
      lat: undefined,
      lon: undefined,
      temp: undefined,
      temp_min: undefined,
      temp_max: undefined,
      humidity: undefined,
      pressure: undefined,
      visibility: undefined,
      description: undefined,
      wind_deg: undefined,
      wind_speed: undefined,
      sunrise: undefined,
      sunset: undefined,
      feels_like: undefined,
      main: undefined,
      date : undefined
   }

   const API_KEY = process.env.REACT_APP_API_KEY;
   const [ weatherDay, setWeatherDay ] = useState(initialWeatherDay);
   const [ weatherHours, setWeatherHours ] = useState([]);
   const [ firstRequestCompleted, setFirstRequestCompleted ] = useState(false);
   const alert = useContext(AlertContext);
 
   const handleLogoClick = () => {
      window.location.reload();
   };
   
   // useEffect(() => {
   //    const savedCoordinates = localStorage.getItem('selectedCoordinates');
   //    if (savedCoordinates) {
   //       const { lat, lon } = JSON.parse(savedCoordinates);
   //       fetchWeatherData(lat, lon);
   //    } 
   //    else if ('geolocation' in navigator) {
   //      navigator.geolocation.getCurrentPosition(
   //        (position) => {
   //          const { latitude, longitude } = position.coords;
   //          fetchWeatherData(latitude, longitude);
   //        },
   //        (error) => {
   //          alert.show(error.message, 'error');
   //          fetchWeatherData(50.4501, 30.5234);
   //        }
   //      );
   //    } else {
   //       alert.show('Geolocation is not supported in this browser', 'error')
   //       fetchWeatherData(50.4501, 30.5234); 
   //    }
   //  }, []);
    
   
   //  function fetchWeatherData(lat, lon) {
   //    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
   //      .then(response => response.json())
   //      .then(data => {
   //        setWeatherDay({ 
   //          name: data.name,
   //          country: data.sys.country,
   //          lat: data.coord.lat,
   //          lon: data.coord.lon,
   //          temp: data.main.temp,
   //          temp_min: data.main.temp_min,
   //          temp_max: data.main.temp_max,
   //          feels_like: data.main.feels_like,
   //          humidity: data.main.humidity,
   //          pressure: data.main.pressure,
   //          visibility: data.visibility,
   //          description: data.weather[0].description,
   //          wind_deg: data.wind.deg,
   //          wind_speed: data.wind.speed,
   //          sunrise: data.sys.sunrise,
   //          sunset: data.sys.sunset,
   //          main: data.weather[0].main,
   //          date: data.dt,
   //       });
   //       setFirstRequestCompleted(true);
   //      })
   //      .catch(error => {
   //        alert.show(error.message, 'error')
   //      });
   //  }


   useEffect(() => {
      const savedCoordinates = localStorage.getItem('selectedCoordinates');
      if (savedCoordinates) {
         const { lat, lon } = JSON.parse(savedCoordinates);
         fetchWeatherData(lat, lon);
      } 
      else if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            alert.show(error.message, 'error');
            fetchWeatherData(50.4501, 30.5234);
          }
        );
      } else {
         alert.show('Geolocation is not supported in this browser', 'error')
         fetchWeatherData(50.4501, 30.5234); 
      }
    }, []);
    
   
    function fetchWeatherData(lat, lon) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
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
         setFirstRequestCompleted(true);
        })
        .catch(error => {
          alert.show(error.message, 'error')
        });
    }




    

   return (
      <div>
         <Header
            weatherDay={weatherDay}
            setWeatherDay={setWeatherDay}
            weatherHours={weatherHours}
            setWeatherHours={setWeatherHours}
            API_KEY={API_KEY}
            firstRequestCompleted={firstRequestCompleted}
            setFirstRequestCompleted={setFirstRequestCompleted}
            handleLogoClick={handleLogoClick}
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