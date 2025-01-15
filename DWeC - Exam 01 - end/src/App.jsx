import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Stock from "./pages/Stock";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./App.css"

export default function App(){
    return(
        <Router>
            <Header/>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/stock" element={<Stock/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </div>
        </Router>
    )
}