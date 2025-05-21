import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TarjetaClima({ clima }) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.temperatura}>{Math.round(clima.main.temp)}°</Text>
      <Text style={estilos.descripcion}>{clima.weather[0].description}</Text>
      <Text style={estilos.rango}>
        Mín: {Math.round(clima.main.temp_min)}° / Máx: {Math.round(clima.main.temp_max)}°
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 250,
  },
  temperatura: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 18,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  rango: {
    fontSize: 14,
    color: '#333',
  },
});
