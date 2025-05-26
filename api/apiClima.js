// api/apiClima.js
import axios from 'axios';

// ¡USA TU NUEVA API KEY!
const API_KEY = '522c549a0bd63182b897ab2c0fb7b4b4';

export const obtenerClimaPorCiudad = async (ciudad) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
  try {
    const respuesta = await axios.get(url);
    return respuesta.data;
  } catch (error) {
    console.error("Error en obtenerClimaPorCiudad:", error.response ? error.response.data : error.message);
    throw error; // Re-lanza el error para que App.js pueda manejarlo
  }
};

// Nueva función para obtener el pronóstico usando coordenadas
export const obtenerPronosticoPorCoordenadas = async (lat, lon) => {
  // Nota: 'current,minutely,hourly,alerts' excluye datos que no necesitamos para el pronóstico diario.
  // El endpoint 'onecall' devuelve 8 días (hoy + 7 días de pronóstico)
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric&lang=es`;
  try {
    const respuesta = await axios.get(url);
    return respuesta.data;
  } catch (error) {
    console.error("Error en obtenerPronosticoPorCoordenadas:", error.response ? error.response.data : error.message);
    throw error; // Re-lanza el error
  }
};