import './assets/css/App.css';
import NavBar from './components/NavBar';
import WeatherPanel from './components/WeatherPanel';

export default function App(){
  return(
    <div className="App">
      <NavBar />
      <WeatherPanel />
    </div>
  )
}