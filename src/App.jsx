import { useContext } from 'react';
import { Routes, Route } from 'react-router';



import DestinationDialog from './components/Trips/DestinationDialog';


import Header from './components/Custom/Header';
// import { UserContext } from './contexts/UserContext';

import CreateTrip from './components/Trips/CreateTrip';
import Hero from './components/Custom/Hero';
import Footer from './components/Custom/Footer';
import { Toaster } from './components/ui/sonner';

const App = () => {
  // const { user } = useContext(UserContext);
  
  return (
    <>
      <Header/>
      <Toaster />

      <Hero/>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/create-trip' element={<CreateTrip/>} />
        
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
