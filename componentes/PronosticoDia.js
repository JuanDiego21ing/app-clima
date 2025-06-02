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
    backgroundColor: "rgba(29, 29, 29, 0.25)", 
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
    height: 200,
   
  },
  dia: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  fecha: {
    fontSize: 13,
    color: '#eeeeee',
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
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  min: {
    color: '#82ccff',
  },
});

export default PronosticoDia;
