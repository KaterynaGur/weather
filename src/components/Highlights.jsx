import React from 'react';
import { HighlightItem } from './HighlightItem';
import { windDirection, getVisibilityRange, getHumidityRange, getPressureRange, time } from '../functions';


export const Highlights = ({weatherDay}) => {
   
   const visibilityData = getVisibilityRange(weatherDay.visibility);
   const humidityData = getHumidityRange(weatherDay.humidity);
   const pressureData = getPressureRange(weatherDay.humidity);
   const windDir = windDirection(weatherDay.wind_deg);
   const timeSunrise = time(weatherDay.sunrise);
   const timeSunset = time(weatherDay.sunset);


   const bodyWind = ( 
      <>
         <p className='highlight_main'>{weatherDay.wind_speed}<span className='text-xl'> km/h</span></p>
         <div className='flex gap-2' >
            <img style={{ rotate: weatherDay.wind_deg + 'deg' }} src="img/arrow.svg" alt="arrow" />
            <span>{windDir}</span>
         </div>
      </>
   )
   const bodySun = ( 
      <>
         <div className='flex items-center'> 
            <div className='w-[32px] h-[32px]'><img src="img/weather_icon/29_sunrise.svg" alt="sunrise" /></div>
            <span className='ml-2'>{timeSunrise}</span>
         </div>
         <div className='flex items-center'>
            <div className='w-[32px] h-[32px]'><img src="img/weather_icon/30_sunset.svg" alt="sunset" /></div>
            <span className='ml-2'>{timeSunset}</span>
         </div>
      </>
   )
   const bodyHumidity = ( 
      <>
         <div className='highlight_main'>
            <span >{weatherDay.humidity}</span>
            <span className='text-xl'>%</span>
         </div>
         <p>{weatherDay.humidity ? humidityData : 'no data'}</p>
      </>
   )
   const bodyVisibility = ( 
      <>
         <p className='highlight_main'>{weatherDay.visibility && `${weatherDay.visibility/1000}`}<span className='text-xl'> km</span> </p>
         <p>{weatherDay.visibility ? visibilityData : 'no data'}</p>
      </>
   )
   const bodyPressure = ( 
      <>
         <p className='highlight_main'>{weatherDay.pressure}<span className='text-xl'> mh</span> </p>
         <p>{weatherDay.pressure ? pressureData : 'no data'}</p>
      </>
   )
   const bodyTemp = ( 
      <>
         <div className='flex items-center relative'>
            <div className='w-[32px] h-[32px] '><img src="img/weather_icon/32_high_temperature.svg" alt="sunrise" /></div>
            <span className='ml-2 sub-parent'>{weatherDay.temp_max}</span>
            <span className='sub-child text-[11px]'>°C</span>
         </div>
         <div className='flex items-center'>
            <div className='w-[32px] h-[32px]'><img src="img/weather_icon/31_low_temperature.svg" alt="sunrise" /></div>
            <span className='ml-2 sub-parent'>{weatherDay.temp_min}</span>
            <span className='sub-child text-[11px]'>°C</span>
         </div>
      </>
   )
   
   return (
      <div className='pt-16 text-black'>
          <h2 className='highlight-header text-xl font-semibold'>Today's highlights</h2>
         <div className='highlight-wrapper'>
            <HighlightItem header='Wind Status' body={bodyWind} />
            <HighlightItem header='Sunrise & Sunset' body={bodySun} />
            <HighlightItem header='Humidity' body={bodyHumidity} />
            <HighlightItem header='Visibility' body={bodyVisibility} />
            <HighlightItem header='Pressure' body={bodyPressure} />
            <HighlightItem header='Temp min & max' body={bodyTemp} />
         </div>
      </div>
   );
}