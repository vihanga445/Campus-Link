import React from 'react';
import Home from './Pages/Home'; // Import your Home component
import { BrowserRouter, Route,Routes } from 'react-router-dom'; // Import the Router, Route, and Switch components
import About from './Pages/About';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Conatact from './Pages/Contact';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';


const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/contact" element={<Conatact />} />
        <Route path="/dashboard" element={<Dashboard />} />
    


      </Routes>
    </BrowserRouter>
  );
}

export default App;
