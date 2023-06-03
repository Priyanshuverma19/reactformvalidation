
import './App.css';
import Signup from './component/Signup';
import Login from './component/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './component/Navbar';
function App() {
  return (
    <div >
     <Router>
        <div>
          <Routes>
            
            <Route exact path="/" element={<Navbar/>} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/Login" element={<Login />} />
            
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
