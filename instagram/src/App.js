import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Main from './components/Main'
import './App.css';


const App = () => {
  return (
    <div style={{maxWidth:'500px'}}>
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
