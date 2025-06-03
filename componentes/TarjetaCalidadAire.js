import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const niveles = [
  'Buena',
  'Aceptable',
  'Moderada',
  'Pobre',
  'Muy Pobre'
];

export default function TarjetaCalidadAire({ datos }) {
  const calidad = datos.list[0];
  const indice = calidad.main.aqi;
  const descripcion = niveles[indice - 1];

  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.titulo}>Calidad del Aire</Text>
      <Text style={estilos.texto}>Índice de calidad del aire: {indice} ({descripcion})</Text>
      <Text style={estilos.texto}>PM2.5: {calidad.components.pm2_5} μg/m³</Text>
      <Text style={estilos.texto}>PM10: {calidad.components.pm10} μg/m³</Text>
      <Text style={estilos.texto}>Ozono (O₃): {calidad.components.o3} μg/m³</Text>
      <Text style={estilos.texto}>Monóxido de carbono (CO): {calidad.components.co} μg/m³</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: "rgba(29, 29, 29, 0.25)", 
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    width: "100%",
    alignItems: "left",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  texto: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 4,
  },
});
