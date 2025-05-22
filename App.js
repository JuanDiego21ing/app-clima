import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar } from 'react-native';
import BuscadorCiudad from './componentes/BuscarCiudad';
import TarjetaClima from './componentes/TarjetaClima';
import { obtenerClimaPorCiudad } from './api/apiClima';

export default function App() {
  const [clima, setClima] = useState(null);
  const [ciudadActual, setCiudadActual] = useState('Londres');

  const obtenerClima = async (ciudad) => {
    if (!ciudad || ciudad.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad válida.');
      return;
    }

    try {
      const datos = await obtenerClimaPorCiudad(ciudad);
      setClima(datos);
      setCiudadActual(ciudad);
    } catch (error) {
      console.error(`Error al obtener datos del clima para la ciudad "${ciudad}":`, error);
      Alert.alert('Error', `No se pudo obtener el clima para "${ciudad}".`);
    }
  };

  useEffect(() => {
    obtenerClima(ciudadActual);
  }, []);

  return (
    <View style={estilos.contenedor}>
      <StatusBar barStyle="light-content" />
      <BuscadorCiudad onBuscar={obtenerClima} />
      {clima ? (
        <TarjetaClima datos={clima} />
      ) : (
        <Text style={estilos.cargando}>Cargando clima...</Text>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#a8d0f0',
    padding: 16,
    paddingTop: 50,
  },
  cargando: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
});
