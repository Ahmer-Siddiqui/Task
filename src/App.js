import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/profile/profile';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/userProfile" element={<Profile/>}/>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
