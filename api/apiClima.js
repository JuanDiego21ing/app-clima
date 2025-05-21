import axios from 'axios';

const API_KEY = '8de1b798ae9a857a2db897c525e888b2';
const ID_CIUDAD = '2643743'; // Londres
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const obtenerClimaActual = async () => {
  const respuesta = await axios.get(`${BASE_URL}/weather`, {
    params: {
      id: ID_CIUDAD,
      units: 'metric',
      lang: 'es',
      appid: API_KEY,
    },
  });
  return respuesta.data;
};

export const obtenerPronostico = async () => {
  const respuesta = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      id: ID_CIUDAD,
      units: 'metric',
      lang: 'es',
      appid: API_KEY,
    },
  });
  return respuesta.data;
};
