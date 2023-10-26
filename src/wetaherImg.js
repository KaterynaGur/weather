export function getWeatherHour (time) {
   const timestamp = time;
   const date = new Date(timestamp * 1000);
   const hours = date.getHours();
   return hours;
}

export function timeOfDay (time, sunrise, sunset) {
   const currentTime = getWeatherHour(time);
   const currentSunrise = getWeatherHour(sunrise);
   const currentSunset = getWeatherHour(sunset);
   if (currentTime>=currentSunrise && currentTime<currentSunset ) {
      return 'day'
   }
   return 'night'
}


export function weatherImg (main, description, time) {
   if (main === 'Clear') {
      if (time==='night' || time==='21:00:00' || time==='00:00:00') {
         return '02_moon'
      }
      return '01_sunny'
   }
   else if (main === 'Rain') {
      return '12_rainstorm'
   } 
   else if (main === 'Snow') {
      return '22_snow'
   }
   else if (main === 'Drizzle') {
      return '10_moderate_rain'
   }
   else if (main === 'Thunderstorm') {
      return '14_thunderstorm'
   }
   else if (main === 'Clouds') {
      if (description==='few clouds') {
         if(time==='night' || time==='21:00:00' || time==='00:00:00') {
            return '05_moon_cloudy'
         }
         return '04_sun_cloudy'
      }
      else if(description==='scattered clouds') {
         return '03_cloud'
      }
      else if(description==='broken clouds' || description==='overcast clouds') {
         return '06_cloudy'
      }
   }
   else if (main === 'Mist' || main === 'Fog' || main === 'Haze' || main === 'Ash') {
      return '15_fog'
   }
   else if (main === 'Dust' || main === 'Sand') {
      return '38_blowing_sand'
   }
   else if (main === 'Tornado') {
      return '27_typhoon'
   }
   else if (main === 'Squall') {
      return '23_windy'
   }
}


