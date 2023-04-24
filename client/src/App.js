
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/profileScreen'
import AdminScreen from './screens/AdminScreen';
import LandingScreen from './screens/LandingScreen';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <BrowserRouter>
      <Routes>
        
        <Route path='home' element = {<Homescreen></Homescreen>}></Route>  
        <Route path = 'book/:roomid/:fromDate/:toDate' element = {<BookingScreen></BookingScreen>}></Route>
        <Route path = 'register' element = {<RegisterScreen></RegisterScreen>}></Route>
        <Route path = 'login' element = {<LoginScreen></LoginScreen>}></Route>
        <Route path = 'profile' element = {<ProfileScreen></ProfileScreen>}></Route>
        <Route path = 'admin' element = {<AdminScreen></AdminScreen>}></Route>
        <Route path = '/' element = {<LandingScreen></LandingScreen>}></Route>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
