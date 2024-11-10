import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position='top-center' />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
