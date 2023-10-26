import { useContext } from "react";
import { AlertContext } from "../context/alert/alertContext"


const Alert = () => {
   const {hide, alert} = useContext(AlertContext);

   if(!alert.visible) {
      return null
   }
   return (
      <div className="container mx-auto mt-5" >
         <div className={`relative w-full rounded-lg ${alert.type === 'success' ? 'bg-green-100 p-4 text-green-700' : ''}
               ${alert.type === 'error' ? 'bg-red-100 p-4 text-red-700' : ''}
               ${alert.type === 'warning' ? 'bg-yellow-100 p-4 text-yellow-700' : ''}
               ${alert.type === 'info' ? 'bg-blue-100 p-4 text-blue-700' : ''}`}>
            <strong>Attention!  </strong>
            <span className="mr-12">{alert.text}</span>
            <div className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20" data-dismissible-target="alert">
               <button className="w-max rounded-lg p-1" onClick={hide}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
         </div>
      </div>
   );
}

export default Alert;

