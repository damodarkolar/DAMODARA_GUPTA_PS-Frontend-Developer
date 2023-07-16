import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Navbar from './components/NavBar/NavBar';
import { useEffect } from 'react';
import { fetchAllCapsulesData } from './redux/Capsule/actions';
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllCapsulesData({limit:6, offset:0}));
}, [])

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
       </Routes>
    </div>
  );
}

export default App;
