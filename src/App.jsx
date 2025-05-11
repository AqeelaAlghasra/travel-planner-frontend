import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import AI from "../src/AI"
import Landing from './components/Landing/Landing';
import Header from './components/Custom/Header';
import { UserContext } from './contexts/UserContext';

import CreateTrip from './components/Trips/CreateTrip';
import Hero from './components/Custom/Hero';
import Footer from './components/Custom/Footer';
import { Toaster } from './components/ui/sonner';

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <Header/>
      <Toaster />
      <NavBar/>
      <Hero/>
      <Routes>
        <Route path='/' element={user ? <App/> : <Landing />} />
        <Route path='/create-trip' element={<CreateTrip/>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/AI' element={<AI />} />
        
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
