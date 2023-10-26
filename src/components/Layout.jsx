import { Header } from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";


export const Layout = () => {

   return (
      <div className="wrapper">
         <Outlet />
         <Footer />
      </div>
   );
}
