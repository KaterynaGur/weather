import React from 'react';
import { weatherImg } from '../wetaherImg';
import { timeOfDay } from '../wetaherImg';
// import { time } from './Highlights'
// import { getWeatherHour } from '../wetaherImg';


export const WeatherMain = (props) => {
   //получаем картинку для погоды
   const timeDay = timeOfDay(props.date, props.sunrise, props.sunset)
   const imgName = weatherImg(props.main, props.description, timeDay)
   //получаем дату
   const dateString = new Date(props.date*1000);
   const date = new Date(dateString);
   const month = date.toLocaleString('default', { month: 'short' });
   const day = date.getDate();
   const result = `${month} ${day}`;



   return (
      <div className='mt-16 flex flex-col items-center text-white'>
         <div className='mb-9 font-medium text-lg'>{props.name ? `${props.name}, ${props.country}` : 'City, Country' }</div>
         <div className='mb-9'> 
            <img className='w-[128px] h-[128px]' src={`img/weather_icon/${imgName}.svg`} alt={imgName} />
         </div>
         <div className=' text-lg'>Today, {props.date ? `${result}`: 'day'}</div>
         <div className='text-[96px] mt-8'> 
            <span className=' sub-parent'>{props.temp ? Math.round(props.temp) : 'T'}</span>
            <span className='text-[34px] sub-child'>&#8451;</span>
         </div>
         <div className=' text-2xl font-normal mb-12'>{props.description ? `${props.description}`: 'Description'}</div>
         <div className=''>
            <span className='sub-parent'>feels like: {props.feels_like ? `${props.feels_like}` : 'temp'}</span>
            <span className='sub-child text-[10px]'>&#8451;</span>
         </div>
      </div>
   );
}