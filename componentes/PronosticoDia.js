// componentes/PronosticoDia.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PronosticoDia = ({ diaData }) => {
  if (!diaData) return null;

  const fecha = new Date(diaData.dt * 1000);
  const nombreDia = fecha.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase();
  const diaMes = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  const iconoClima = diaData.weather[0].icon;
  const urlIcono = `http://openweathermap.org/img/wn/${iconoClima}@2x.png`;

  return (
    <View style={estilos.card}>
      <Text style={estilos.dia}>{nombreDia}</Text>
      <Text style={estilos.fecha}>{diaMes}</Text>
      <Image source={{ uri: urlIcono }} style={estilos.icono} />
      <Text style={estilos.temperaturas}>
        <Text style={estilos.max}>{Math.round(diaData.temp.max)}° </Text>
        <Text style={estilos.min}>/ {Math.round(diaData.temp.min)}°</Text>
      </Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
    height: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
  dia: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  fecha: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
    textTransform: 'capitalize',
  },
  icono: {
    width: 50,
    height: 50,
    marginVertical: 4,
  },
  temperaturas: {
    marginTop: 6,
    fontSize: 14,
  },
  max: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  min: {
    color: '#3498db',
  },
});

export default PronosticoDia;
