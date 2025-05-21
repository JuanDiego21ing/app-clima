import axios from 'axios';

const API_KEY = '8de1b798ae9a857a2db897c525e888b2'; // Reemplaza con tu clave real

export const obtenerClimaPorCiudad = async (ciudad) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
  const respuesta = await axios.get(url);
  return respuesta.data;
};