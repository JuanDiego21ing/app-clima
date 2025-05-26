// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, ActivityIndicator, ScrollView, Platform } from 'react-native'; // <--- CORRECCIÓN AQUÍ
import BuscadorCiudad from './componentes/BuscarCiudad';
import TarjetaClima from './componentes/TarjetaClima';
import ListaPronosticos from './componentes/ListaPronosticos';
import { obtenerClimaPorCiudad, obtenerPronosticoPorCoordenadas } from './api/apiClima';

export default function App() {
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [ciudadActual, setCiudadActual] = useState('Londres');
  const [cargando, setCargando] = useState(true);

  const obtenerDatosCompletos = async (ciudad) => {
    if (!ciudad || ciudad.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad válida.');
      return;
    }

    setCargando(true);
    setClima(null);
    setPronostico(null);

    try {
      const datosClima = await obtenerClimaPorCiudad(ciudad);
      setClima(datosClima);
      setCiudadActual(datosClima.name);

      if (datosClima.coord) {
        const datosPronostico = await obtenerPronosticoPorCoordenadas(datosClima.coord.lat, datosClima.coord.lon);
        setPronostico(datosPronostico);
      } else {
        Alert.alert('Error', 'No se pudieron obtener las coordenadas para el pronóstico.');
      }

    } catch (error) {
      console.error(`Error al obtener datos del clima para la ciudad "${ciudad}":`, error);
      Alert.alert('Error', `No se pudo obtener el clima para "${ciudad}". Intenta de nuevo.`);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatosCompletos(ciudadActual);
  }, []);

  return (
    <ScrollView contentContainerStyle={estilos.scrollContenedor}>
      <View style={estilos.contenedor}>
        <StatusBar barStyle="light-content" backgroundColor="#6a9fce" />
        <BuscadorCiudad onBuscar={obtenerDatosCompletos} />

        {cargando && (
          <View style={estilos.contenedorCarga}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={estilos.cargandoTexto}>Cargando clima...</Text>
          </View>
        )}

        {!cargando && clima && (
          <TarjetaClima datos={clima} />
        )}

        {!cargando && pronostico && pronostico.daily && (
          <ListaPronosticos pronostico={pronostico} />
        )}

        {!cargando && !clima && !pronostico && (
           <Text style={estilos.cargandoTexto}>No se pudieron cargar los datos.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  scrollContenedor: {
    flexGrow: 1,
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#a8d0f0',
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50, // Aquí se usa Platform
    alignItems: 'center',
  },
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cargandoTexto: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});