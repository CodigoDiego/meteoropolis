import React, {useState, useEffect} from "react";
import '../stylesheets/Weather.css';
// import ima from '../graphics/icons/';
import logo from '../graphics/MeteoropolisLogo.png';

function Weather(){

  
  const [search, setSearch] = useState("London");
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState({
    city:"",
    country:"",
    temp:"",
    condition:"",
    conditionText:"",
    humidity:"",
    wind:""
  });
  
  
  const Fetch = async () =>{
    try {
      if(!search.trim()) throw{
        message: "This field cannot be empty."
      }
      await fetch(apiUrl).then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
          return res.json();
        }).then((data) => {
          setWeather({
            city: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition,
            conditionText: data.current.condition.text,
            humidity: data.current.humidity,
            wind: data.current.wind_kph
        })
      });
    } catch (error) {
      // console.log(error);
    }
  };
  
  useEffect(() => {
    Fetch();
  }, [search]);
  
  // const apiUrl= `https://api.weatherapi.com/v1/current.json?key=${REACT_APP_API_KEY}&q=${search}`;
  const apiUrl= `https://api.weatherapi.com/v1/current.json?key=c017f8b662f640cc9b1161818233012&q=${search}`;
  
  const searchCity = async (e) =>{
    e.preventDefault();
    await Fetch();
  };
  
  const getUiIcon = (imageName)=>{
    try {
      return require(`../graphics/icons/UI/${imageName}`);
    } catch (error) {
      console.log("Some weather icons are not designed yet but im working on it.");
    }
  };
  
  const sliceCondition = (text) =>{
    let words = text.split(" ");
    let result = words.slice(0,2).join(" ");
    return result;
  }
  
  const getIma = () => {
    console.log(weather.conditionTxt);
    try {
      return require(`../graphics/icons/${weather.conditionText}.png`);
    } catch (error) {
      console.log("Some weather icons have not been designed yet though i am working on it");
    }
  };

    return(
        <div className="header-container">
            <div className="logo-container">
                {/* <img className="logo" src={logo} alt="Meteoropolis logo"/> */}
                <h1>METEOROPOLIS</h1>
            </div>

            <div className="weather-container">
                <div className="card-container">
                    <div className="icon-container">
                        <img src={getIma()} alt="wi" className="icon"/> 
                    </div>
                    <div className="city-and-condition">
                    <h4>{weather.city}</h4>
                    <h2>{sliceCondition(weather.conditionText)}</h2>
                    </div>
                    <div className="spacer"></div>
                    <img src={getUiIcon("temp.png")} className="ui-icon"/>
                    <h3>{weather.temp}</h3>
                    <h3>°C</h3>
                    <div className="spacer"></div>
                    <img src={getUiIcon("humidity.png")} className="ui-icon"/>
                    <h3>{weather.humidity}</h3>
                    <h5>%</h5>
                    <div className="spacer"></div>
                    <img src={getUiIcon("wind.png")} className="ui-icon"/>
                    <h3>{weather.wind}</h3>
                    <h5>km/h</h5>
                    <div className="spacer"></div>
                    <form onSubmit={searchCity}>
                        <input type="text"  className="input" placeholder="Search location..." onChange={(e)=>setSearch(e.target.value)}></input>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Weather;