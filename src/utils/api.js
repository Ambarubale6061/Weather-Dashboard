import axios from 'axios';
const API = 'https://api.openweathermap.org/data/2.5';
export async function fetchCurrent(city){
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const res = await axios.get(`${API}/weather?q=${city}&appid=${key}&units=metric`);
  return res.data;
}
