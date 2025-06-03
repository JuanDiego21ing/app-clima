import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, ActivityIndicator, ScrollView, Platform, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import BuscadorCiudad from './componentes/BuscarCiudad';
import TarjetaClima from './componentes/TarjetaClima';
import TarjetaClimaCaract from './componentes/TarjetaClimaCaract';
import TarjetaCalidadAire from './componentes/TarjetaCalidadAire'; 
import ListaPronosticos from './componentes/ListaPronosticos';

import {obtenerClimaPorCiudad,obtenerPronosticoPorCoordenadas,obtenerClimaPorCoords,obtenerClimaCompleto,obtenerCalidadAire } from './api/apiClima';

export default function App() {
  const [clima, setClima] = useState(null);
  const [climaExtra, setClimaExtra] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [calidadAire, setCalidadAire] = useState(null); 
  const [cargando, setCargando] = useState(true);

  const obtenerDatosPorUbicacion = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere permiso de ubicación para mostrar el clima local.');
        return;
      }

      const ubicacion = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = ubicacion.coords;

      const datosClima = await obtenerClimaPorCoords(latitude, longitude);
      setClima(datosClima);

      const datosPronostico = await obtenerPronosticoPorCoordenadas(latitude, longitude);
      setPronostico(datosPronostico);

      const datosClimaExtra = await obtenerClimaCompleto(latitude, longitude);
      setClimaExtra(datosClimaExtra);

      const datosCalidad = await obtenerCalidadAire(latitude, longitude); 
      setCalidadAire(datosCalidad);

    } catch (error) {
      console.error("Error obteniendo ubicación o clima:", error);
      Alert.alert('Error', 'No se pudo obtener el clima local.');
    } finally {
      setCargando(false);
    }
  };

  const obtenerDatosPorCiudad = async (ciudad) => {
    if (!ciudad || ciudad.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el nombre de una ciudad válida.');
      return;
    }

    setCargando(true);
    setClima(null);
    setPronostico(null);
    setClimaExtra(null);
    setCalidadAire(null); 

    try {
      const datosClima = await obtenerClimaPorCiudad(ciudad);
      setClima(datosClima);

      const { lat, lon } = datosClima.coord;
      const datosPronostico = await obtenerPronosticoPorCoordenadas(lat, lon);
      setPronostico(datosPronostico);

      const datosClimaExtra = await obtenerClimaCompleto(lat, lon);
      setClimaExtra(datosClimaExtra);

      const datosCalidad = await obtenerCalidadAire(lat, lon); 
      setCalidadAire(datosCalidad);

    } catch (error) {
      Alert.alert('Error', `No se pudo obtener el clima para "${ciudad}".`);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerDatosPorUbicacion();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/fondo1.jpg')}
      style={estilos.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={estilos.scrollContenedor}>
        <View style={estilos.contenedor}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <BuscadorCiudad onBuscar={obtenerDatosPorCiudad} />

          {cargando ? (
            <View style={estilos.contenedorCarga}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={estilos.cargandoTexto}>Cargando clima...</Text>
            </View>
          ) : (
            <>
              {clima && <TarjetaClima datos={clima} />}
              {climaExtra && <TarjetaClimaCaract datos={climaExtra} />}
              {calidadAire && <TarjetaCalidadAire datos={calidadAire} />} 
              {pronostico && pronostico.daily && <ListaPronosticos pronostico={pronostico} />}
              {!clima && !pronostico && (
                <Text style={estilos.cargandoTexto}>No se pudieron cargar los datos.</Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const estilos = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContenedor: {
    flexGrow: 1,
  },
  contenedor: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
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
