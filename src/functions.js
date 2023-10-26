export function windDirection(windDegrees) {
   if ((windDegrees >= 337.5 && windDegrees <= 360) || (windDegrees >=0 && windDegrees < 22.5)) {
      return "North";
   } else if (windDegrees >= 22.5 && windDegrees < 67.5) {
      return "Northeast";
   } else if (windDegrees >= 67.5 && windDegrees < 112.5) {
      return "East";
   } else if (windDegrees >= 112.5 && windDegrees < 157.5) {
      return "Southeast";
   } else if (windDegrees >= 157.5 && windDegrees < 202.5) {
      return "South";
   } else if (windDegrees >= 202.5 && windDegrees < 247.5) {
      return "Southwest";
   } else if (windDegrees >= 247.5 && windDegrees < 292.5) {
      return "West";
   } else {
      return "Northwest";
   }
}

export function getVisibilityRange (visibility) {
   if(visibility >= 10000) {
      return 'excellent'
   }
   else if (visibility >= 5000 && visibility <= 9999) {
      return 'good'
   }
   else if (visibility >= 1000 && visibility <= 4999) {
      return 'average'
   }
   else if (visibility >= 200 && visibility <= 999) {
      return 'bad'
   }
   else if (visibility < 200 ) {
      return 'very bad'
   }
   return 'no data'
}

export function getHumidityRange (humidity) {
   if (humidity < 20) {
      return 'very low'
   }
   else if (humidity >= 30 && humidity <= 50) {
      return 'average'
   }
   else if (humidity >= 50 && humidity <= 70) {
      return 'high'
   }
   else if (humidity > 70) {
      return 'very high'
   }
   return 'no data'
}

export function getPressureRange (pressure) {
   if (pressure < 1000) {
      return 'low'
   }
   else if (pressure >= 1001 && pressure <= 1020) {
      return 'normal'
   }
   else if (pressure > 1020 ) {
      return 'high'
   }
   return 'no data'
}
export function time(timestamp) {
   const date = new Date(timestamp * 1000);
   const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
   });
   return formattedTime;
}