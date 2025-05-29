import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TarjetaClimaCaract({ datos }) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#black', marginBottom: 8 }}>Condiciones  Actuales</Text>
      <Text style={estilos.texto}>
        🌡️ Sensación térmica: {datos.sensacionTermica.toFixed(1)}°C
      </Text>
      <Text style={estilos.texto}>💧 Humedad: {datos.humedad}%</Text>
      <Text style={estilos.texto}>
        🌫️ Visibilidad: {datos.visibilidad / 1000} km
      </Text>
      <Text style={estilos.texto}>
        🌬️ Presión atmosférica: {datos.presion} hPa
      </Text>
      <Text style={estilos.texto}>
        💨 Velocidad del viento: {datos.viento} km/h
      </Text>
      <Text style={estilos.texto}>☀️ Índice UV: {datos.indiceUV}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({

  tarjeta: {
    backgroundColor: "#white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    width: "100%",
    alignItems: "left",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 4,
  },
});
