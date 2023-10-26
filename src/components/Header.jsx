import React from 'react';
import { Form } from './Form';
import Alert from './Alert';

export const Header = ({weatherHours, weatherDay, API_KEY, setWeatherDay, setWeatherHours, firstRequestCompleted, setFirstRequestCompleted, handleLogoClick}) => {
   
   return (
      <header className='header'>
            <div className='header__container'>
               <div className='header-form-wrap w-[320px] px-5 py-4 flex-none'>
                  <Form weatherDay={weatherDay} setWeatherDay={setWeatherDay} weatherHours={weatherHours} setWeatherHours={setWeatherHours} API_KEY={API_KEY}
                  firstRequestCompleted={firstRequestCompleted} setFirstRequestCompleted={setFirstRequestCompleted}
                  />
                  <Alert />
               </div>
               <div className='header-title-wrap'>
                  <a href="#" onClick={handleLogoClick}><h1 className="header-title">MeteoGuide</h1></a> 
               </div>
            </div>    
         </header>
   );
}