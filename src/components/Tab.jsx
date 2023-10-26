import React, {useState, useEffect, useRef} from 'react';
import { weatherImg } from '../wetaherImg';


export const Tab = ({weatherHours}) => {
   const tabContainerRef = useRef(null);

   const weatherDataByDate = {};
   
   weatherHours.forEach(item => {
      const dateParts = item.dt_txt.split(' ')[0].split('-');
      const year = parseInt(dateParts[0], 10); 
      const month = parseInt(dateParts[1], 10); 
      const day = parseInt(dateParts[2], 10); 

      const dateValue = new Date(year, month - 1, day);

      if (!weatherDataByDate[dateValue]) {
         weatherDataByDate[dateValue] = [];
      }
      weatherDataByDate[dateValue].push(item);
   });

   const dates = Object.keys(weatherDataByDate);
   const [activeDate, setActiveDate] = useState(null);
   

   useEffect(() => {
      if (!activeDate && dates.length > 0) {
        setActiveDate(dates[0]);
      }
    }, [activeDate, dates])

    useEffect(() => {
      if (dates.length > 0) {
        setActiveDate(dates[0]);
      }
    }, [weatherHours]);

    useEffect(() => {
      if (tabContainerRef.current) {
         tabContainerRef.current.scrollLeft = 0;
      }
   }, [activeDate]);
   
   return (
      <div className='tabs mt-16 flex flex-col'>
         <div  className='scroller'>
            <div ref={tabContainerRef} className="tabHeader scroller__items">
               {dates.map( date  => (
                  <div
                     key={date}
                     onClick={() => {setActiveDate(date);}}
                     className={`text-left pb-2 text-lg cursor-pointer font-medium ${date === activeDate ? 'active text-black font-medium border-b-[2px] border-black':'text-black/[0.6]'}`}
                  >
                     <p>{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}, {new Date(date).toLocaleDateString(undefined, { day: 'numeric',month:'short', })}</p>
                  </div>
               ))}
            </div>
         </div>
         <div className='scroller'>
             <ul
               className='tabBody scroller__items gap-4 text-black overflow-hidden'
            >
               {weatherDataByDate[activeDate]?.map((date,index)  => (

                  <li 
                     key={index}
                     className='flex flex-col items-center py-6 px-4 highlight-tab'
                  >
                     <p>{date.dt_txt.split(' ')[1].slice(0,5)}</p>
                     <div className='w-[32px] h-[32px]'>
                        <img
                        src={`img/weather_icon/${weatherImg(date.weather[0].main, date.weather[0].description, date.dt_txt.split(' ')[1])}.svg`}
                        alt="Weather Icon"
                        />
                     </div>
                     <p className='text-xl w-[44px] text-center mt-1'>
                        <span className='sub-parent'>{+date.main.temp.toFixed()}</span> 
                        <span className='sub-child text-sm'>°C</span>
                     </p>
                  </li>
                  ))
               }
            </ul>
         </div>
            
      </div>
   );
}





