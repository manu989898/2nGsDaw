import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Header from "./components/Header";
import Search from "./components/Search";
import "./css/styles.css"

export default function App(){
    return(
        <Router>
            <div className="page">
            <Header/>
            <Search/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/stock" element={<Stock/>}/>
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </div>
            </div>
         
        </Router>
    )
}