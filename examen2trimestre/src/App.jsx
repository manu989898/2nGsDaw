
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Male from './pages/Male'
import Female from './pages/Female.jsx'



function App() {

  return (
    <Router>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/female" element={<Female/>}/>
                    <Route path="/male" element={<Male/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
            </div>
        </Router>
  )
}

export default App
