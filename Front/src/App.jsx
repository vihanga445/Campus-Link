import React from 'react';
import Home from './Pages/Home'; // Import your Home component
import { BrowserRouter, Route,Routes } from 'react-router-dom'; // Import the Router, Route, and Switch components
import About from './Pages/AboutUs';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Conatact from './Pages/ContactUs';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreatePost from './Pages/CreatePost';
import UpdatePost from './Pages/UpdatePost';
import PostPage from './Pages/PostPage';
import Event from './Pages/Eventspage';



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
        <Route path="/events" element={<Event/>}/>
        
        <Route element={<PrivateRoute />}>

           <Route path="/dashboard" element={<Dashboard />} />
           <Route path='/create-post' element={<CreatePost />} />
           <Route path='/update-post/:postId' element={<UpdatePost />} />

        </Route>

        <Route path='/post/:postSlug' element={<PostPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
