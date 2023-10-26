import AlertState from './context/alert/AlertState';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ErrorPage } from './pages/ErrorPage';
import { HomePage } from './pages/HomePage';


const router = createBrowserRouter(createRoutesFromElements(
   <Route path='/' element={<Layout/>} >
      <Route index element={<HomePage />}/>
      <Route path='*' element={ <ErrorPage /> }/>
   </Route>
))

function App() {

  return (
   <AlertState>
      <RouterProvider router={router}/>
   </AlertState> 
  );
}

export default App;
