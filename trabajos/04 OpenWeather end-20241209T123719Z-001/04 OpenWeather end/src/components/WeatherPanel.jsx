import {useState} from "react"
import Form from "./Form"
import Card from "./Card"

export default function WeatherPanel(){
    const[loading, setLoading] = useState(false);
    const[show, setShow] = useState(false);
    const[weather, setWeather] = useState([]);
    const[forecast, setForecast] = useState([]);

    const appid = "000129725b683e58d194bb09dc763dd9";
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${appid}&lang=en`;
    let cityUrl = "&q=";
    
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${appid}&lang=en`;
    
    const getLocation = async(loc) => {
        setLoading(true);

        urlWeather = urlWeather + cityUrl + loc;

        await fetch(urlWeather).then(res => {
            if(!res.ok) throw {res}
            return res.json();
        }).then(data => {
            console.log(data);
            setWeather(data);
        }).catch(error => {
            console.error(error);
            setLoading(false);
            setShow(false);
        })
        
        urlForecast = urlForecast + cityUrl + loc;
        
        await fetch(urlForecast).then(res => {
            if(!res.ok) throw {res}
            return res.json();
        }).then(data => {
            console.log(data);
            setForecast(data);
            setLoading(false);
            setShow(true);
        }).catch(error => {
            console.error(error);
            setLoading(false);
            setShow(false);
        })
    }

    return(
        <>
            <Form getLocation={getLocation}/>
            <Card show={show} loading={loading} weather={weather} forecast={forecast}/>
        </>
    )
}