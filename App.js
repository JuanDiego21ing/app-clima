// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, StatusBar, ActivityIndicator, ScrollView, Platform } from 'react-native';
import * as Location from 'expo-location'; 
import BuscadorCiudad from './componentes/BuscarCiudad';
import TarjetaClima from './componentes/TarjetaClima';
import ListaPronosticos from './componentes/ListaPronosticos';
import { obtenerClimaPorCiudad, obtenerPronosticoPorCoordenadas, obtenerClimaPorCoords } from './api/apiClima';

export default function App() {
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
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

    try {
      const datosClima = await obtenerClimaPorCiudad(ciudad);
      setClima(datosClima);

      const { lat, lon } = datosClima.coord;
      const datosPronostico = await obtenerPronosticoPorCoordenadas(lat, lon);
      setPronostico(datosPronostico);
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
    <ScrollView contentContainerStyle={estilos.scrollContenedor}>
      <View style={estilos.contenedor}>
        <StatusBar barStyle="light-content" backgroundColor="#6a9fce" />
        <BuscadorCiudad onBuscar={obtenerDatosPorCiudad} />

        {cargando ? (
          <View style={estilos.contenedorCarga}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={estilos.cargandoTexto}>Cargando clima...</Text>
          </View>
        ) : (
          <>
            {clima && <TarjetaClima datos={clima} />}
            {pronostico && pronostico.daily && <ListaPronosticos pronostico={pronostico} />}
            {!clima && !pronostico && (
              <Text style={estilos.cargandoTexto}>No se pudieron cargar los datos.</Text>
            )}
          </>
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
