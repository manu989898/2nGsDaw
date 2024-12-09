import Spinner from "./Spinner"
import {KelvinToCelcius} from "../utils/Converters"

export default function Card({loading, show, weather, forecast }){

   let today = new Date();
   let day = today.getDate();
   let month = today.getMonth()+1;
   let year = today.getFullYear();
   let date = day + "/" + month + "/" + year;

   let url, iconUrl = "";
   let iconUrl3, iconUrl6, iconUrl9 = "";
   let forecastDate3, forecastDate6, forecastDate9 = "";

   if(loading) return <Spinner/>
   if(show){
      url = "http://openweathermap.org/img/w/";
      iconUrl = url + weather.weather[0].icon + ".png";

      iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
      iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
      iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";

      forecastDate3 = forecast.list[1].dt_txt.substring(8, 10) + '/' + forecast.list[1].dt_txt.substring(5, 7) + '/' + forecast.list[1].dt_txt.substring(0, 4) + ' ' + forecast.list[1].dt_txt.substring(11, 13);
      forecastDate6 = forecast.list[2].dt_txt.substring(8, 10) + '/' + forecast.list[2].dt_txt.substring(5, 7) + '/' + forecast.list[2].dt_txt.substring(0, 4) + ' ' + forecast.list[2].dt_txt.substring(11, 13);
      forecastDate9 = forecast.list[3].dt_txt.substring(8, 10) + '/' + forecast.list[3].dt_txt.substring(5, 7) + '/' + forecast.list[3].dt_txt.substring(0, 4) + ' ' + forecast.list[3].dt_txt.substring(11, 13);
   }

   return(      
      <div className="mt-5">
      {show?
         <div className="container">
            <div className="card mb-3 mx-auto bg-dark text-light">
               <div className="row g-0">
                  <div className="col-md-4">
                     <h3 className="card-title">{weather.name}</h3>
                     <p className="card-date">{date}</p>
                     <h1 className="card-temp">{KelvinToCelcius(weather.main.temp,1,true)}</h1>
                     <p className="card-desc"><img src={iconUrl} alt="icon"/>{weather.weather[0].description}</p>
                     <img src="https://images.pexels.com/photos/10817264/pexels-photo-10817264.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className="img-fluid rounded-start" alt="..."/>
                  </div>
                  <div className="col-md-8">
                     <div className="card-body text-start mt-2">
                        <h5 className="card-text">Temperatura máxima: {KelvinToCelcius(weather.main.temp_max,1,true)}</h5>
                        <h5 className="card-text">Temperatura mínima: {KelvinToCelcius(weather.main.temp_min,1,true)}</h5>
                        <h5 className="card-text">Sensación térmica: {KelvinToCelcius(weather.main.feels_like,1,true)}</h5>
                        <h5 className="card-text">Humedad: {weather.main.humidity} %</h5>
                        <h5 className="card-text">Velocidad del viento: {weather.wind.speed} m/s</h5>
                     </div>
                     <hr/>
                     <div className="row mt-4">
                        <div className="col">
                           <p>{forecastDate3}h</p>
                           <p className="description"><img src={iconUrl3} alt="icon"/>{forecast.list[1].weather[0].description}</p>
                           <p className="temp">{KelvinToCelcius(forecast.list[1].main.temp,1,true)}</p>
                        </div>
                        <div className="col">
                           <p>{forecastDate6}h</p>
                           <p className="description"><img src={iconUrl6} alt="icon"/>{forecast.list[2].weather[0].description}</p>
                           <p className="temp">{KelvinToCelcius(forecast.list[2].main.temp,1,true)}</p>
                        </div>
                        <div className="col">
                           <p>{forecastDate9}h</p>
                           <p className="description"><img src={iconUrl9} alt="icon"/>{forecast.list[3].weather[0].description}</p>
                           <p className="temp">{KelvinToCelcius(forecast.list[3].main.temp,1,true)}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         :<h2 className="text-light">No data to show</h2>
      }
      </div>
   )
}


