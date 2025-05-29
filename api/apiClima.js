
import axios from 'axios';


const API_KEY = '522c549a0bd63182b897ab2c0fb7b4b4';

export const obtenerClimaPorCiudad = async (ciudad) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
  try {
    const respuesta = await axios.get(url);
    return respuesta.data;
  } catch (error) {
    console.error("Error en obtenerClimaPorCiudad:", error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const obtenerClimaCompleto = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const respuesta = await axios.get(url);
    return {
      temperatura: respuesta.data.current.temp,
      sensacionTermica: respuesta.data.current.feels_like,
      humedad: respuesta.data.current.humidity,
      presion: respuesta.data.current.pressure,
      visibilidad: respuesta.data.current.visibility,
      viento: respuesta.data.current.wind_speed,
      indiceUV: respuesta.data.current.uvi, 
    };
  } catch (error) {
    console.error("Error en obtenerClimaCompleto:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export const obtenerPronosticoPorCoordenadas = async (lat, lon) => {
  
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=es`;
  try {
    const respuesta = await axios.get(url);
    return respuesta.data;
  } catch (error) {
    console.error("Error en obtenerPronosticoPorCoordenadas:", error.response ? error.response.data : error.message);
    throw error; 
  }
};

export const obtenerClimaPorCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
  try {
    const respuesta = await axios.get(url);
    return respuesta.data;
  } catch (error) {
    console.error("Error en obtenerClimaPorCoords:", error.response ? error.response.data : error.message);
    throw error;
  }
};
