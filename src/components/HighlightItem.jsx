import React from 'react';

export const HighlightItem = ({header, body}) => {
   
   return (
      <div className='highlight gap-5'>
         <div className='highlight-title'>{header}</div>
         <div className='flex flex-col gap-5'>{body}</div>
      </div>
   );
}