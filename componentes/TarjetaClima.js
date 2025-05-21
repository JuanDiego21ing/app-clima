import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TarjetaClima({ datos }) {
  const { name, main, weather } = datos;
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.ciudad}>{name}</Text>
      <Text style={estilos.descripcion}>{weather[0].description}</Text>
      <Text style={estilos.temperatura}>🌡 {main.temp.toFixed(1)} °C</Text>
      <Text style={estilos.minmax}>Mín: {main.temp_min}°C / Máx: {main.temp_max}°C</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  ciudad: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  temperatura: {
    fontSize: 32,
    marginVertical: 10,
  },
  minmax: {
    fontSize: 16,
    color: '#555',
  },
});
