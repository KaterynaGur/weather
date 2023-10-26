import React from 'react';
import { Form } from './Form';
import Alert from './Alert';

export const Header = ({ setWeatherDay, setWeatherHours}) => {

   const handleLogoClick = () => {
      window.location.reload();
   };
   
   return (
      <header className='header'>
         <div className='header__container'>
            <div className='header-form-wrap w-[320px] px-5 py-4 flex-none'>
               <Form  setWeatherDay={setWeatherDay} setWeatherHours={setWeatherHours} />
               <Alert />
            </div>
            <div className='header-title-wrap'>
               <a href="#" onClick={handleLogoClick}><h1 className="header-title">MeteoGuide</h1></a> 
            </div>
         </div>
      </header>
   );
}